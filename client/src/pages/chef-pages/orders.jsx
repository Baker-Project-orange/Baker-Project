import React, { useState, useEffect } from 'react';
import { Search, Filter, Package, DollarSign, User, Info, CheckCircle, Truck } from 'lucide-react';
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders/');
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const results = orders.filter(order =>
      (order.orderItems && order.orderItems.some(item => 
        (item.dish && item.dish.name && item.dish.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (item.dish && typeof item.dish === 'string' && item.dish.toLowerCase().includes(searchTerm.toLowerCase()))
      )) ||
      (order.orderMaker && order.orderMaker.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterStatus === 'All' || order.status === filterStatus)
    );
    setFilteredOrders(results);
  }, [searchTerm, filterStatus, orders]);

  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  const getTotalPrice = (orderItems) => {
    return (orderItems || []).reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0);
  };

  return (
    <div className="min-h-screen bg-[#f8e5e1] rounded-lg overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#c98d83] mb-8">Orders</h1>

        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="relative mb-4 md:mb-0 md:w-1/3">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#c98d83]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2 text-gray-400" size={20} />
          </div>

          <div className="relative">
            <select
              className="appearance-none bg-white border rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#c98d83]"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <Filter className="absolute right-2 top-2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map(order => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-[#c98d83]">Order #{order._id ? order._id.slice(-6) : 'N/A'}</h2>
                </div>
              </div>
              <div className="p-4 bg-gray-50">
                {(order.orderItems || []).map((item, index) => (
                  <div key={item._id || index} className="mb-2 text-gray-600">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.dish && item.dish.name ? item.dish.name : (typeof item.dish === 'string' ? item.dish : 'Unknown Dish')}</span>
                      <span>x{item.quantity || 1}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span>Price per item: ${(item.price || 0).toFixed(2)}</span>
                      <span>Subtotal: ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                    </div>
                    {index < (order.orderItems || []).length - 1 && <hr className="my-2" />}
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4 text-gray-600 font-bold">
                  <span>Total:</span>
                  <span>${getTotalPrice(order.orderItems).toFixed(2)}</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center mb-2 text-gray-600">
                  <User size={16} className="mr-2" />
                  <span>{order.orderMaker || 'Anonymous'}</span>
                </div>
                <div className="flex items-start mb-4 text-gray-600">
                  <Info size={16} className="mr-2 mt-1" />
                  <span>{order.orderDetails || 'No details provided'}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Admin Amount: ${(order.totalAdminAmount || 0).toFixed(2)}</span>
                  <span>Chef Amount: ${(order.totalChefAmount || 0).toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Created at: {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Unknown'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;