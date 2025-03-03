import { HttpException, HttpStatus, Injectable } from '@nestjs/common'; // Import Injectable từ NestJS, cho phép đánh dấu class này là một service
import { Repository } from 'typeorm'; // Import Repository từ TypeORM để làm việc với database
import { User } from '../auth/entities/user.entity';
import { Role } from '../auth/entities/role.entity'; // Import User entity để thao tác với bảng 'users' trong database
import { InjectRepository } from '@nestjs/typeorm'; // Import InjectRepository từ TypeORM để inject User repository
import * as bcrypt from 'bcryptjs'; // Import bcrypt để mã hóa mật khẩu người dùng
import { RegisterUserDTO } from './dto/register-user.dto'; // Import RegisterUserDTO để định dạng và xác thực dữ liệu đầu vào
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserDTO } from './dto/google.dto';
import { UpdateEmailDTO } from './dto/update-email.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { createCanvas } from 'canvas'; // Thư viện hỗ trợ vẽ ảnh
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

// Đánh dấu class là một service có thể được chèn vào các phần khác của ứng dụng
@Injectable()
export class AuthService {

    // Inject User repository vào service, cho phép thao tác với bảng 'users' trong database
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Role) private roleRepository: Repository<Role>,
        private jwtService: JwtService

    ) { }

    async generateAvatarByName(name: string): Promise<string> {
        const canvasSize = 200;
        const canvas = createCanvas(canvasSize, canvasSize);
        const ctx = canvas.getContext('2d');

        // Tạo màu nền
        ctx.fillStyle = '#2c7be5'; // Màu xanh
        ctx.fillRect(0, 0, canvasSize, canvasSize);

        // Lấy ký tự đầu của tên
        const initials = name
            .split(' ')
            .map((word) => word[0]?.toUpperCase())
            .slice(0, 2)
            .join('');

        // Vẽ ký tự lên ảnh
        ctx.font = 'bold 80px Arial';
        ctx.fillStyle = '#fff'; // Màu chữ trắng
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(initials, canvasSize / 2, canvasSize / 2);

        // Tạo đường dẫn để lưu avatar
        const avatarPath = path.join('../front-end/public/avatar');
        if (!fs.existsSync(avatarPath)) {
            fs.mkdirSync(avatarPath, { recursive: true });
        }
        const fileName = `${Date.now()}-${name}.jpg`;
        const filePath = path.join(avatarPath, fileName);

        // Lưu ảnh
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(filePath, buffer);

        return `/avatars/${fileName}`; // Trả về đường dẫn để lưu vào database
    }

    //Phương thức đăng ký
    async register(registerUserDTO: RegisterUserDTO): Promise<User> {
        // Gọi phương thức hashPassword để mã hóa mật khẩu
        const hashPassword = await this.hashPassword(registerUserDTO.password);
        // Gán roleId mặc định là 2 nếu không được chỉ định
        const roleId = registerUserDTO.roleId || 2;
        // Tạo avatar theo tên
        const avatar = await this.generateAvatarByName(registerUserDTO.username);
        // Lưu thông tin người dùng vào database, bao gồm mật khẩu đã mã hóa và refresh_token
        return await this.userRepository.save({
            ...registerUserDTO,
            username: registerUserDTO.username,// Sao chép tất cả các thuộc tính từ RegisterUserDTO
            refresh_token: "reresasdasd", // Thêm refresh_token (có thể là một giá trị ngẫu nhiên hoặc cố định)
            password: hashPassword, // Thay thế mật khẩu bằng mật khẩu đã mã hóa
            roleId,
            avatar,
        });
    }
    // Phương thức private để mã hóa mật khẩu bằng bcrypt
    private async hashPassword(password: string): Promise<string> {
        const saltRound = 10; // Định nghĩa số vòng salt cho bcrypt
        const salt = await bcrypt.genSalt(saltRound); // Tạo salt mới với số vòng salt đã định nghĩa
        const hash = await bcrypt.hash(password, salt); // Mã hóa mật khẩu với salt vừa tạo
        return hash; // Trả về mật khẩu đã mã hóa
    }

    //Phương thức đăng nhập
    async login(loginUserDTO: LoginUserDTO): Promise<any> {
        //Tìm kiếm người dùng trong cơ sở dữ liệu dựa trên email được cung cấp
        const user = await this.userRepository.findOne({
            where: { email: loginUserDTO.email }, relations: ['role']
        });
        if (!user) {
            throw new HttpException("Email is not exist", HttpStatus.UNAUTHORIZED);
        }
        //So sánh mật khẩu mà người dùng cung cấp với mật khẩu đã mã hóa (hashed) lưu trong cơ sở dữ liệu
        const checkPass = bcrypt.compareSync(loginUserDTO.password, user.password)
        if (!checkPass) {
            throw new HttpException("Password is not correct", HttpStatus.UNAUTHORIZED);
        }
        //tạo access token và refress token
        //Nếu email và mật khẩu hợp lệ, tạo một payload chứa thông tin cơ bản của người dùng, 
        //bao gồm id và email. Payload này sẽ được sử dụng để tạo JWT.
        // Thêm roleId vào payload
        const roleIds = user.role ? [user.role.id] : [];
        const payload = { id: user.id, username: user.username, email: user.email, roleIds };
        return this.generateToken(payload);
    }

 
    //Phương thức tạo token
    private async generateToken(payload: { id: number; email: string; roleIds: number[] }) {
        const access_token = await this.jwtService.signAsync(payload);
        const refresh_token = await this.jwtService.signAsync(payload, {
            secret: '123456',
            expiresIn: '1d',
        });

        // Cập nhật refresh token cho người dùng
        await this.userRepository.update(
            { email: payload.email },
            { refresh_token: refresh_token },
        );

        return { access_token, refresh_token };
    }

    async refreshToken(refresh_token: string): Promise<any> {
        try {
            const verifiedPayload = await this.jwtService.verifyAsync(refresh_token, { secret: '123456' });
            const user = await this.userRepository.findOne({
                where: { email: verifiedPayload.email, refresh_token },
                relations: ['role'],
            });

            if (!user) {
                throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
            }

            const roleIds = user.role ? [user.role.id] : [];
            return this.generateToken({ id: user.id, email: user.email, roleIds });
        } catch (error) {
            throw new HttpException('Refresh token is not valid', HttpStatus.BAD_REQUEST);
        }
    }

    //Phương thức đăng nhập với Google
    async googleLogin(googleUserData: GoogleUserDTO): Promise<any> {
        try {
            let user = await this.userRepository.findOne({
                where: [
                    { googleId: googleUserData.googleId },
                    { email: googleUserData.email }
                ],
                relations: ['role'],
            });
            if (!user) {
                const avatar = await this.downloadGoogleAvatar(googleUserData.avatar, googleUserData.username);
                user = await this.userRepository.save({
                    username: googleUserData.username,
                    email: googleUserData.email,
                    googleId: googleUserData.googleId,
                    avatar,
                    password: await this.hashPassword(Math.random().toString(36)),
                    refresh_token: "",
                    role: { id: 2 },
                });
            } else if (!user.avatar) {
                const avatar = await this.downloadGoogleAvatar(googleUserData.avatar, googleUserData.username);
                user.avatar = avatar;
                await this.userRepository.save(user);
            }

            const roleIds = user.role ? [user.role.id] : [];
            const payload = { id: user.id, username: user.username, email: user.email, roleIds };
            return this.generateToken(payload);
        } catch (error) {
            throw new Error('Google authentication failed');
        }
    }

    async downloadGoogleAvatar(url: string, name: string): Promise<string> {
        const avatarPath = path.join('../front-end/public/avatar');
        if (!fs.existsSync(avatarPath)) {
            fs.mkdirSync(avatarPath, { recursive: true });
        }
        const fileName = `${Date.now()}-${name}.jpg`;
        const filePath = path.join(avatarPath, fileName);

        // Tải ảnh từ URL và lưu vào file
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        fs.writeFileSync(filePath, Buffer.from(response.data, 'binary'));

        return fileName;  // Trả về trực tiếp fileName mà không có đường dẫn
    }



    async updateEmail(updateEmailDTO: UpdateEmailDTO, userId: number): Promise<any> {
        // Kiểm tra xem email mới có trùng với email đã có trong cơ sở dữ liệu không
        const existingUser = await this.userRepository.findOne({ where: { email: updateEmailDTO.newEmail } });
        if (existingUser) {
            throw new HttpException('Email is already taken', HttpStatus.BAD_REQUEST);
        }

        // Cập nhật email của người dùng
        await this.userRepository.update(userId, { email: updateEmailDTO.newEmail });

        // Lấy lại thông tin người dùng mới (bao gồm email đã cập nhật)
        const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['role'] });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // Tạo lại token mới với email đã được cập nhật
        const roleIds = user.role ? [user.role.id] : [];
        const payload = { id: user.id, username: user.username, email: user.email, roleIds };
        return this.generateToken(payload); // Trả về token mới
    }

    // Hàm thay đổi mật khẩu người dùng
    async changePassword(userId: number, updatePasswordDTO: UpdatePasswordDTO): Promise<any> {
        // Tìm người dùng theo userId
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        // So sánh mật khẩu cũ với mật khẩu trong cơ sở dữ liệu
        const isOldPasswordValid = bcrypt.compareSync(updatePasswordDTO.oldPassword, user.password);
        if (!isOldPasswordValid) {
            throw new HttpException('Old password is incorrect', HttpStatus.BAD_REQUEST);
        }

        // Mã hóa mật khẩu mới
        const hashedNewPassword = await this.hashPassword(updatePasswordDTO.newPassword);

        // Cập nhật mật khẩu mới vào cơ sở dữ liệu
        await this.userRepository.update(userId, { password: hashedNewPassword });

        // Trả về thông báo thành công
        return { message: 'Password changed successfully' };
    }

}
