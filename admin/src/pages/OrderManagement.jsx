import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag } from 'lucide-react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading orders...</div>;
  }

  return (
    <div className="space-y-6  p-6 min-h-screen">
      <h2 className="text-2xl font-bold flex items-center text-black">
        <ShoppingBag className="mr-2" />
        Order Management
      </h2>
      <div className="b p-4 rounded-lg shadow">
        <h3 className="font-semibold text-lg mb-4 text-black">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/20">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Total Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Chef Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-[#c98d83] transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-black">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-black">${order.totalAdminAmount}</td>
                  <td className="px-6 py-4 text-black">${order.totalChefAmount}</td>
                  <td className="px-6 py-4 text-black">
                    <button className="text-black hover:text-rose-200 transition-colors duration-150">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;