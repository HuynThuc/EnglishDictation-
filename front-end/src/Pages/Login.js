import React, { useEffect, useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, fetchAccessToken } from '../ContextAPI/authContext';

const Login = ({ theme }) => {
    const navigate = useNavigate();
    const { login, handleGoogleLoginSuccess } = useAuth();
    const [loginData, setLoginData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [authError, setAuthError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
      // Lấy token từ cookie khi ứng dụng khởi tạo
      handleGoogleLoginSuccess();
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

    useEffect(() => {
        const accessToken = fetchAccessToken();
        if (accessToken) {
            navigate('/');  // Nếu đã đăng nhập, chuyển hướng đến trang chủ
        }
    }, [navigate]);

    useEffect(() => {
        if (isSubmitted) {
            validateForm();
        }
    }, [loginData]);

    const onChange = (event) => {
        const target = event.target;
        setLoginData({
            ...loginData,
            [target.name]: target.value
        });
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        let valid = validateForm();
        if (valid) {
            try {
                const result = await login(loginData.email, loginData.password);
                if (result.success) {
                    navigate('/'); // Sau khi đăng nhập thành công, chuyển hướng về trang chủ
                } else {
                    setAuthError(result.message); // Hiển thị thông báo lỗi
                }
            } catch (error) {
                console.error(error);
            }
        }
        setIsSubmitted(true);
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};
        if (!loginData.email) {
            errors.email = "Please enter email";
        } else {
            const valid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(loginData.email);
            if (!valid) {
                errors.email = "Email is not valid";
            }
        }

        if (!loginData.password) {
            errors.password = "Please enter password";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            isValid = false;
        } else {
            setFormErrors({});
        }

        return isValid;
    };

    return (
        <div className={`w-full min-h-screen flex justify-center ${theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-white text-black"}`}>
            <div className="max-w-xl w-full h-max border rounded-md mt-40 mb-10 p-4 shadow-xl">
                <h1 className="text-3xl font-semibold mb-5">Đăng nhập</h1>
                <button   onClick={handleGoogleLogin} className="ml-2 bg-white border px-3 py-2 rounded font-medium text-sm text-gray-700 flex gap-2 items-center">
                    <FcGoogle size={24} />
                    Đăng nhập bằng Google
                </button>
                <hr className="my-5 border border-gray-300" />

                <form className="space-y-4 mb-8" onSubmit={onSubmit}>
                    <h1 className="text-2xl font-semibold">Hoặc sử dụng mật khẩu</h1>

                    {/* Hiển thị thông báo lỗi khi đăng nhập thất bại */}
                    {authError && <p className="text-red-500">{authError}</p>}

                    <div className="flex flex-col gap-3">
                        <label>Email hoặc tên người dùng</label>
                        <input
                            type="text"
                            name="email"
                            onChange={onChange}
                            className={`border border-gray-500 px-3 py-2 rounded ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
                        />
                        {formErrors.email && <span className="text-red-500">{formErrors.email}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label>Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            onChange={onChange}
                            className={`border border-gray-500 px-3 py-2 rounded ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
                        />
                        {formErrors.password && <span className="text-red-500">{formErrors.password}</span>}
                    </div>
                    <button className="px-3 py-2 text-white rounded-md bg-green-700 hover:bg-green-800 transition-all duration-300">
                        Đăng nhập
                    </button>
                </form>

                <div className="space-y-3">
                    <div className="flex gap-1">
                        <p>Quên mật khẩu?</p>
                        <a href="/reset-password" className="font-medium text-blue-600">Khôi phục tài khoản</a>
                    </div>
                    <div className="flex gap-1">
                        <p>Chưa có tài khoản?</p>
                        <Link to="/register" className="font-medium text-blue-600">Đăng ký ngay</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
