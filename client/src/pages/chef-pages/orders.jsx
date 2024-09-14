import React, { useState, useEffect } from 'react';
import { Search, Filter, User, Info, CheckCircle, Truck, Calendar } from 'lucide-react';
import axios from 'axios';

const Orders1 = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/orders/');
      setOrders(response.data.map(sanitizeOrder));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const results = orders.filter(order => {
      const matchesSearch = 
        searchTerm === '' ||
        order.orderItems.some(item => 
          (item.dishName || '').toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        (order.orderMaker || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order._id || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'All' || order.status === filterStatus;

      return matchesSearch && matchesStatus;
    });
    setFilteredOrders(results);
  }, [searchTerm, filterStatus, orders]);

  const sanitizeOrder = (order) => {
    return {
      _id: order._id || 'N/A',
      orderItems: (order.orderItems || []).map(item => ({
        _id: item._id || '',
        dishName: item.dish ? item.dish.dishName : (item.dishName || 'Unknown Dish'),
        quantity: item.quantity || 1,
        price: item.price || 0
      })),
      orderMaker: order.orderMakerName || 'Anonymous',
      orderDetails: order.orderDetails || 'No details provided',
      totalAdminAmount: order.totalAdminAmount || 0,
      totalChefAmount: order.totalChefAmount || 0,
      createdAt: order.createdAt || null,
      status: order.status || 'Pending'
    };
  };

  const statuses = ['All', 'Pending', 'Completed'];

  const getTotalPrice = (orderItems) => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleDoneClick = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/api/orders/${orderId}`, { status: 'Completed' });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: 'Completed' } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-[#f8e5e1] text-[#8b4513]';
      case 'Completed': return 'bg-[#f0d0c9] text-[#8b4513]';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf6f4] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#8b4513] mb-8">
          Orders Dashboard
        </h1>

        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between p-6 rounded-lg shadow-md">
          <div className="relative mb-4 md:mb-0 md:w-1/2">
            <input
              type="text"
              placeholder="Search by dish, order ID, or customer name..."
              className="w-full pl-10 pr-4 py-2 border border-[#c98d83] rounded-full focus:outline-none focus:ring-2 focus:ring-[#c98d83] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              className="absolute left-3 top-2 text-[#c98d83]"
              size={20}
            />
          </div>

          <div className="relative w-full md:w-auto">
            <select
              className="w-full md:w-auto appearance-none bg-white border border-[#c98d83] rounded-full px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#c98d83] focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <Filter
              className="absolute right-2 top-2 text-[#c98d83]"
              size={20}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-[#e0c0b0] flex flex-col"
            >
              <div className="p-4 border-b border-[#e0c0b0] bg-[#fff5f0]">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-[#8b4513]">
                    Order #
                    {typeof order._id === "string"
                      ? order._id.slice(-6)
                      : "N/A"}
                  </h2>
                  <span
                    className={`font-semibold px-3 py-1 rounded-full text-sm ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="p-4 bg-white flex-grow">
                <div className="space-y-2">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="text-[#5d4037] flex-col justify-between"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{item.dishName}</span>
                        <span>x{item.quantity}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-[#8d6e63]">
                        <span>Price per item: ${item.price.toFixed(2)}</span>
                        <span>
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      {index < order.orderItems.length - 1 && (
                        <hr className="my-2 border-[#e0c0b0]" />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 text-[#5d4037] font-bold">
                  <span>Total:</span>
                  <span>${getTotalPrice(order.orderItems).toFixed(2)}</span>
                </div>
              </div>
              <div className="p-4 bg-[#fff5f0] mt-auto">
                <div className="flex items-center mb-2 text-[#5d4037]">
                  <User size={16} className="mr-2 text-[#8b4513]" />
                  <span>{order.orderMaker}</span>
                </div>
                <div className="flex items-start mb-4 text-[#5d4037]">
                  <Info size={16} className="mr-2 mt-1 text-[#8b4513]" />
                  <span>{order.orderDetails}</span>
                </div>
                <div className="flex justify-between items-center text-sm text-[#8d6e63]">
                  <span>
                    Admin Amount: ${order.totalAdminAmount.toFixed(2)}
                  </span>
                  <span>Chef Amount: ${order.totalChefAmount.toFixed(2)}</span>
                </div>
                <div className="text-sm text-[#8d6e63] mt-2 flex items-center">
                  <Calendar size={14} className="mr-2 text-[#8b4513]" />
                  <span>
                    Created:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleString()
                      : "Unknown"}
                  </span>
                </div>
                {order.status !== "Completed" ? (
                  <button
                    onClick={() => handleDoneClick(order._id)}
                    className="mt-4 bg-[#c98d83] text-white px-6 py-2 rounded-md hover:bg-[#b17a71] transition-colors duration-300 flex items-center justify-center w-full shadow-md hover:shadow-lg"
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Mark as Done
                  </button>
                ) : (
                  <div className="mt-4 bg-[#f8e5e1] text-[#8b4513] text-sm px-4 py-3 rounded-lg flex items-center justify-center shadow-inner">
                    <Truck size={18} className="mr-2" />
                    Driver on the way to pick up the order
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders1;