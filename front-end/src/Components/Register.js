import React, { useState } from 'react';
import requestApi from '../helpers/api';

function Register() {
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Thêm trạng thái thông báo

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
    setIsSubmitted(true); // Đánh dấu là đã submit

    const valid = validateForm();
    if (valid) {
      // Tiến hành với logic submit form
      requestApi('/auth/register', 'POST', signupData)
        .then((res) => {
          console.log(res);
          setSuccessMessage('Registration successful!'); // Cập nhật thông báo
        })
        .catch((err) => {
          console.error(err);
          setSuccessMessage('An error occurred. Please try again.'); // Thông báo lỗi
        });
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create an account</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Nickname:</label>
          <input
            type="text"
            name="username"
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {formErrors.username && <p style={{ color: 'red' }}>{formErrors.username}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            name="email"
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {formErrors.email && <p style={{ color: 'red' }}>{formErrors.email}</p>}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
          {formErrors.password && <p style={{ color: 'red' }}>{formErrors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Submit
        </button>
      </form>
      {successMessage && (
        <p className="text-green-500 mt-4 text-center font-semibold">{successMessage}</p>
      )}
      <p className="text-sm text-gray-600 mt-4">
        Had an account already? <a href="/login" className="text-blue-500 hover:underline">Login here</a>
      </p>
    </div>
  );
}

export default Register;
