import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gọi API để xác thực thông tin đăng nhập
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Login</h2>
        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Login
      </button>
      <p className="text-sm text-gray-600 mt-4">
        Forgot password? <a href="/forgot password" className="text-blue-500 hover:underline">Click here</a>
      </p>
      <p className="text-sm text-gray-600 mt-2">
        Don't have an account? <a href="/sign-up" className="text-blue-500 hover:underline">Sign up</a>
      </p>
    </form>
  );
}

export default Login;