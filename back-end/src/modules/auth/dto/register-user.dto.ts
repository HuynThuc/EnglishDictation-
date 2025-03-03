// DTO cho việc đăng ký người dùng mới
export class RegisterUserDTO {
    username: string;
    email: string;
    password: string;
    roleId?: number;
    avatar: string;
}

// Chức năng: Định nghĩa cấu trúc dữ liệu mà controller sẽ nhận khi thực hiện yêu cầu đăng ký người dùng.
// Chi tiết: RegisterUserDTO chứa các thuộc tính username, email, và password, mà người dùng cần cung cấp khi đăng ký. 
// DTO giúp kiểm tra dữ liệu đầu vào và đảm bảo dữ liệu hợp lệ trước khi gửi đến service.