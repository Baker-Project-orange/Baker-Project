// AdminLoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // لاستخدام التنقل بين الصفحات

const AdminLogin = () => {
  const [email, setEmail] = useState(''); // Changed from username to email for consistency
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // إرسال طلب تسجيل الدخول
      const response = await axios.post('http://localhost:3000/api/admins/login', { email, password });
      
      // تخزين الـ Token في الـ Local Storage
      localStorage.setItem('token', response.data.token);
      
      setMessage(response.data.message);
      
      // توجيه المستخدم إلى صفحة أخرى بعد تسجيل الدخول الناجح (مثل صفحة لوحة التحكم)
      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Server error');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Admin Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Email:</label> {/* Changed to Email */}
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
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Login
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </form>
  );
};

export default AdminLogin;
