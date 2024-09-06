import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Mail, Save } from 'lucide-react'; // تأكد من تثبيت react-feather أو استخدام أي أيقونات أخرى تفضلها
import { useParams } from 'react-router-dom'; // لتحصيل الـ ID من URL

const UserProfile = () => {
  //   const { id } = useParams(); // الحصول على الـ ID من URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const id = '66d8bd9cc2a111f83548549f';

  useEffect(() => {
    // الحصول على معلومات المستخدم عند تحميل الصفحة
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/users/${id}`);
        setUserInfo(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setGender(response.data.gender);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/users/users/${id}`, {
        name,
        email,
        gender,
      });
      console.log('User updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="h-full overflow-auto bg-[#f8e5e1] rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#c98d83]">User Information</h2>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* User Info Card */}
        <div className="relative bg-white border-2 border-[#c98d83] rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <User className="text-[#c98d83] mr-2" size={20} />
            <h3 className="text-xl font-semibold text-[#c98d83]">User Info</h3>
          </div>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <User className="text-[#c98d83] mr-2" size={20} />
              <span className="font-semibold">{userInfo.name || 'N/A'}</span>
            </div>
            <div className="flex items-center mb-2">
              <Mail className="text-[#c98d83] mr-2" size={20} />
              <span className="font-semibold">{userInfo.email || 'N/A'}</span>
            </div>
            <div className="flex items-center mb-2">
              <span className="font-semibold">{userInfo.gender || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <div className="relative bg-white border-2 border-[#c98d83] rounded-lg shadow-sm p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#c98d83]">Update User Information</h2>

          {/* Name Input */}
          <div className="relative mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="flex items-center border-2 border-[#c98d83] rounded-md shadow-sm px-3 py-2">
              <User className="text-[#c98d83] mr-2" size={20} />
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full focus:outline-none border-none focus:ring-0 bg-transparent"
                placeholder="Enter your name"
              />
            </div>
          </div>
          
          {/* Email Input */}
          <div className="relative mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="flex items-center border-2 border-[#c98d83] rounded-md shadow-sm px-3 py-2">
              <Mail className="text-[#c98d83] mr-2" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full focus:outline-none border-none focus:ring-0 bg-transparent"
                placeholder="Enter your email address"
              />
            </div>
          </div>
          
          {/* Gender Input */}
          <div className="relative mb-4">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <div className="flex items-center border-2 border-[#c98d83] rounded-md shadow-sm px-3 py-2">
              <User className="text-[#c98d83] mr-2" size={20} />
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full focus:outline-none border-none focus:ring-0 bg-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          {/* Update Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-[#c98d83] text-white px-6 py-3 rounded-full hover:bg-[#b67c73] transition-colors duration-300 flex items-center justify-center"
            >
              <Save className="mr-2" size={20} />
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
