import { Body, Post, Controller, Get, Req, Res, UseGuards, HttpException, HttpStatus, Put, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUserDTO } from './dto/register-user.dto';
import { AuthService } from './auth.service';
import { User } from '../auth/entities/user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import { GoogleUserDTO } from './dto/google.dto';
import { UpdateEmailDTO } from './dto/update-email.dto';
import { UpdatePasswordDTO } from './dto/update-password.dto';

import { Request, Response } from 'express';
//Xác định controller cho các yêu cầu đến route /auth.
@Controller('auth')
export class AuthController {

  

    //Điều này cho phép bạn gọi các phương thức của AuthService từ AuthController
    constructor(private authService: AuthService) { }
    

    //Đánh dấu phương thức register để xử lý các yêu cầu POST đến route /auth/register.
    @Post('register')
    //Lấy dữ liệu từ yêu cầu HTTP và ánh xạ nó vào đối tượng RegisterUserDTO.
    register(@Body() registerUserDTO: RegisterUserDTO): Promise<User> {
        console.log('register api')
        console.log(registerUserDTO)
        //Gọi phương thức register của AuthService để thực hiện logic đăng ký và trả về đối tượng User.
        return this.authService.register(registerUserDTO);
    }

    @Post('login')
    login(@Body() loginUserDTO: LoginUserDTO): Promise<any> {
        console.log("login api");
        console.log(loginUserDTO);
        return this.authService.login(loginUserDTO)
    }


    @Post('refresh-token')
    refreshToken(@Body() { refresh_token }): Promise<any> {
        console.log('refresh token api');
        return this.authService.refreshToken(refresh_token)
    }


    // Đường dẫn để bắt đầu quá trình đăng nhập với Google.
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req: Request) {
        // Request sẽ được chuyển hướng đến Google để xác thực.
    }

    // Handle Google OAuth callback
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthCallback(@Req() req: any, @Res() res: Response) {
        try {
            // Get user data from the validated Google profile
            const googleUser: GoogleUserDTO = {
                googleId: req.user.googleId,
                email: req.user.email,
                username: req.user.username,
                avatar: req.user.avatar, 
            };

            // Process login with Google user data
            const tokens = await this.authService.googleLogin(googleUser);

            // Thiết lập cookie httpOnly cho bảo mật
            res.cookie('access_token', tokens.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600 * 1000, // Thời gian tồn tại của cookie: 1 giờ
            });

            // Chuyển hướng tới frontend với token trong URL
            res.redirect(`${process.env.FRONTEND_URL}?token=${tokens.access_token}`);
        } catch (error) {
            console.error('Error during Google authentication callback:', error);
            // Chuyển hướng tới trang lỗi đăng nhập nếu có lỗi xảy ra
            res.status(HttpStatus.FOUND).redirect('/login/error');
        }
    }

    // Endpoint để cập nhật email người dùng
    @Put('update-email/:userId')
    async updateEmail(
        @Param('userId') userId: number, // Lấy userId từ tham số URL
        @Body() updateEmailDTO: UpdateEmailDTO, // Lấy thông tin email mới từ body request
    ): Promise<any> {
        try {
            return await this.authService.updateEmail(updateEmailDTO, userId); // Gọi service để cập nhật email
        } catch (error) {
            // Bắt lỗi nếu có và trả về thông báo lỗi tương ứng
            throw new HttpException(error.response || 'Internal server error', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Put('update-password/:userId')
    async changePassword(
        @Param('userId') userId: number, // Lấy userId từ tham số URL
        @Body() updatePasswordDTO: UpdatePasswordDTO, // Lấy thông tin email mới từ body request
    ): Promise<any> {
        try {
            return await this.authService.changePassword(userId, updatePasswordDTO); // Gọi service để cập nhật email
        } catch (error) {
            // Bắt lỗi nếu có và trả về thông báo lỗi tương ứng
            throw new HttpException(error.response || 'Internal server error', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
