import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/messages/messages");
        setMessages(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleReply = (email, subject) => {
    const mailtoLink = `mailto:${email}?subject=Re: ${encodeURIComponent(subject)}`;
    window.location.href = mailtoLink;
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#c98d83]">Manage Contact Messages</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#f0e4e2]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a4a] uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a4a] uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a4a] uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a4a] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message._id} className="hover:bg-[#f8f4f3] transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap">{message.from}</td>
                <td className="px-6 py-4 whitespace-nowrap">{message.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap">{message.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{message.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleReply(message.email, message.subject)}
                    className="text-[#c98d83] hover:text-[#b67c73] transition-colors duration-200"
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactMessages;