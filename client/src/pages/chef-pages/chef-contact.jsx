import React, { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contactus_chef = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Implement form submission logic here
    };

    return (
      <div className="h-full overflow-auto font-serif bg-[#fbf6f4] rounded-lg p-6">
        <h2 className="text-3xl font-bold text-[#c98d83] mb-6 text-center">
          Contact Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-gray-600 mb-6">
              We'd love to hear from you! Please fill out the form below.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-2 border-[#c98d83] shadow-sm focus:border-[#c98d83] focus:ring focus:ring-[#c98d83] focus:ring-opacity-50 px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-2 border-[#c98d83] shadow-sm focus:border-[#c98d83] focus:ring focus:ring-[#c98d83] focus:ring-opacity-50 px-4 py-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-md border-2 border-[#c98d83] shadow-sm focus:border-[#c98d83] focus:ring focus:ring-[#c98d83] focus:ring-opacity-50 px-4 py-2"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#c98d83] text-white px-6 py-3 rounded-full hover:bg-[#b67c73] transition-colors duration-300 flex items-center justify-center"
              >
                <Send className="mr-2" size={20} />
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-[#c98d83] rounded-lg shadow-md p-6 text-white">
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="mr-2 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Address:</h4>
                  <p>123 Bakery Lane, Sweetville, CA 90210</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="mr-2 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Phone:</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="mr-2 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Email:</h4>
                  <p>info@sweetdelights.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock className="mr-2 mt-1" size={20} />
                <div>
                  <h4 className="font-semibold">Business Hours:</h4>
                  <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p>Saturday: 9:00 AM - 5:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Contactus_chef;