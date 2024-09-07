// src/components/Orders.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag, DollarSign, Box } from 'lucide-react'; // تأكد من تثبيت react-feather أو استخدام أي أيقونات أخرى تفضلها

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/users/orders/${userId}`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="h-full overflow-auto bg-[#f8e5e1] rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#c98d83]">User Orders</h2>
      <div className="max-w-2xl mx-auto space-y-6">
        {orders.length > 0 ? (
          orders.map(order => (
            <div key={order._id} className="relative bg-white border-2 border-[#c98d83] rounded-lg shadow-sm p-6">
              <div className="flex items-center mb-4">
                <ShoppingBag className="text-[#c98d83] mr-2" size={20} />
                <h3 className="text-xl font-semibold text-[#c98d83]">Order ID: {order._id}</h3>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Box className="text-[#c98d83] mr-2" size={20} />
                  <span className="font-semibold">Items: {order.items.join(', ')}</span>
                </div>
                <div className="flex items-center mb-2">
                  <DollarSign className="text-[#c98d83] mr-2" size={20} />
                  <span className="font-semibold">Total Amount: ${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center mb-2">
                  <span className="font-semibold">Status: {order.status}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
