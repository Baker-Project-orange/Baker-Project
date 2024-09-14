import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Send, Phone, MapPin, Mail } from "lucide-react";
import additionalImage from "../assets/8dcd2937317f1f248e3c9e4975c96c2b-removebg-preview.png"; // Replace with your image path
import Header from "../components/Header";

// تخصيص الإشعارات باستخدام Tailwind CSS
const customToastStyle = {
  backgroundColor: "#c98d83",
  color: "#ffffff",
  border: "1px solid #c98d83",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/messages/messages", {
        from: formData.name,
        subject: formData.subject,
        message: formData.message,
        email: formData.email,
      });

      toast.success("Message sent successfully!", {
        position: "top-right",
        autoClose: 5000,
        style: customToastStyle, // استخدام الأنماط المخصصة
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        style: customToastStyle, // استخدام الأنماط المخصصة
      });
    }
  };

  return (
    <>
      <Header />

      <div className="relative mt-[50px]">
        {" "}
        {/* Adjust margin to raise the image */}
        <img
          src={additionalImage} // Replace with your image path
          alt="Additional"
          className="w-4/4 h-auto object-cover mx-auto -mt-[460px]" // Adjust width as needed
          style={{ maxWidth: "900px" }} // Optional: Set a max-width for better control
        />
      </div>
      <div className="min-h-screen bg-[#fbf6f4] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Contact Information */}
              <div className="bg-[#c98d83] p-10 text-white">
                <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                <p className="text-lg mb-8">
                  We'd love to hear from you. Our team is always here to chat.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="w-6 h-6" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Mail className="w-6 h-6" />
                    <span>contact@bakerydelight.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="w-6 h-6" />
                    <span>123 Bakery Street, Sweet City, 12345</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#c98d83] focus:ring focus:ring-[#c98d83] focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#c98d83] focus:ring focus:ring-[#c98d83] focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#c98d83] focus:ring focus:ring-[#c98d83] focus:ring-opacity-50"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#c98d83] focus:ring focus:ring-[#c98d83] focus:ring-opacity-50"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center space-x-2 bg-[#c98d83] text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-300"
                    >
                      <span>Send Message</span>
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Toast Container */}
        <ToastContainer />
      </div>
    </>
  );
};

export default ContactUs;
