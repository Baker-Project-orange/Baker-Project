// AdminRegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // استخدم useNavigate للتنقل

const AdminRegister = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // استخدم hook للتنقل بين الصفحات

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Send name, email, and password to match the backend
      const response = await axios.post('http://localhost:3000/api/admins/register', { name, email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server error');
    }
  };

  // دالة التنقل إلى صفحة تسجيل الدخول
  const goToLogin = () => {
    navigate('/Adminlogin'); // التنقل إلى صفحة /login
  };

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Admin Registration</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password:</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mb-4">
        Register
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
      {/* زر التنقل إلى صفحة تسجيل الدخول */}
      <button
        type="button"
        onClick={goToLogin}
        className="w-full bg-gray-500 text-white py-2 rounded mt-2"
      >
        Go to Login
      </button>
    </form>
  );
};

export default AdminRegister;
