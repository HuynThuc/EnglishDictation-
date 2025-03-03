import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import requestApi from '../helpers/api';

const Register = ({ theme }) => {
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái gửi form
  const [successMessage, setSuccessMessage] = useState(''); // Thông báo thành công

  // Hàm onchange
  const onChange = (event) => {
    const { name, value } = event.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm submit
  const onSubmit = (event) => {
    event.preventDefault(); // Ngăn chặn hành vi submit mặc định
    setIsSubmitting(true); // Đánh dấu là đang gửi form

    const valid = validateForm();
    if (valid) {
      // Tiến hành với logic submit form
      requestApi('/auth/register', 'POST', signupData)
        .then((res) => {
          console.log(res);
          setSuccessMessage('Đăng ký thành công!'); // Hiển thị thông báo thành công
          setSignupData({ username: '', email: '', password: '' }); // Reset form
        })
        .catch((err) => {
          console.error(err);
          setSuccessMessage(''); // Đặt lại nếu có lỗi
        })
        .finally(() => {
          setIsSubmitting(false); // Đặt lại trạng thái sau khi xử lý xong
        });
    } else {
      setIsSubmitting(false); // Đặt lại trạng thái nếu form không hợp lệ
    }
  };

  // Kiểm tra nhập liệu
  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!signupData.username) {
      errors.username = 'Please enter your nickname';
      isValid = false;
    }
    if (!signupData.email) {
      errors.email = 'Please enter your email';
      isValid = false;
    } else {
      const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(signupData.email);
      if (!validEmail) {
        errors.email = 'Email is not valid';
        isValid = false;
      }
    }
    if (!signupData.password) {
      errors.password = 'Please enter your password';
      isValid = false;
    }

    setFormErrors(errors); // Cập nhật lỗi nếu có
    return isValid; // Trả về kết quả xác thực
  };

  return (
    <div
      className={`w-full min-h-screen flex justify-center ${theme === "dark" ? "bg-gray-900 text-gray-400" : "bg-white text-black"}`}
    >
      <div className="max-w-xl w-full h-max border rounded-md mt-40 mb-10 p-4">
        <h1 className="text-3xl font-semibold mb-5">Create an account</h1>
        <button className="ml-2 bg-white border px-3 py-2 rounded font-medium text-sm text-gray-700 flex gap-2 items-center">
          <FcGoogle size={24} />
          Đăng nhập bằng Google
        </button>
        <hr className="my-5 border border-gray-300" />

        {successMessage && (
          <div className="mb-4 text-green-600 font-medium">
            {successMessage}
          </div>
        )}

        <form className="space-y-4 mb-8" onSubmit={onSubmit}>
          <h1 className="text-2xl font-semibold">Or enter your information</h1>
          <div className="flex flex-col gap-3">
            <label>Nickname</label>
            <input
              type="text"
              name="username"
              value={signupData.username}
              onChange={onChange}
              className={`border border-gray-500 px-3 py-2 rounded ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
            />
            {formErrors.username && <p className="text-red-500 text-sm">{formErrors.username}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label>Username or Email</label>
            <input
              type="text"
              name="email"
              value={signupData.email}
              onChange={onChange}
              className={`border border-gray-500 px-3 py-2 rounded ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>
          <div className="flex flex-col gap-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={onChange}
              className={`border border-gray-500 px-3 py-2 rounded ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>
          <button
            className="px-3 py-2 text-white rounded-md bg-green-700 hover:bg-green-800 transition-all duration-300"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? 'Đang gửi...' : 'Submit'}
          </button>
        </form>

        <div className="flex gap-1">
          <p>Had an account already?</p>
          <Link to="/login" className="text-blue-600 underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
