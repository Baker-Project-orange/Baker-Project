import React from "react";
import { ShoppingBag, DollarSign, Box } from "lucide-react";

const StaticOrderCard = () => {
  // Static order data
  const order = {
    _id: "static_order_1",
    orderItems: [
      {
        dish: "Garlic Bread",
        quantity: 2,
        price: 5.99,
      },
      {
        dish: "Margherita Pizza",
        quantity: 1,
        price: 12.99,
      },
    ],
    totalPrice: 24.97,
    orderDetails: "Deliver by 6 PM",
  };

  return (
    <div className="relative bg-white border border-gray-200 rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="flex items-center mb-4">
        <ShoppingBag className="text-[#c98d83] mr-2" size={24} />
        <h3 className="text-xl font-semibold text-[#c98d83]">Order # 1</h3>
      </div>
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Box className="text-[#c98d83] mr-2" size={24} />
          <span className="font-semibold text-gray-700">Items:</span>
        </div>
        <div className="ml-6">
          {order.orderItems.map((item, index) => (
            <div key={index} className="flex items-center mb-2">
              <span className="font-semibold text-gray-800">{item.dish}:</span>
              <p className="ml-2 text-gray-600">Quantity: {item.quantity}</p>
              <p className="ml-2 text-gray-600">
                Price: ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center mb-2">
          <DollarSign className="text-[#c98d83] mr-2" size={24} />
          <span className="font-semibold text-gray-700">
            Total Amount: ${order.totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center mb-2">
          <span className="font-semibold text-gray-700">
            Details: {order.orderDetails}
          </span>
        </div>
      </div>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="h-full overflow-auto bg-[#f8e5e1] rounded-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#c98d83]">
        User Orders
      </h2>
      <div className="max-w-2xl mx-auto space-y-6">
        <StaticOrderCard />
        {/* Other orders can be added here */}
      </div>
    </div>
  );
};

export default Orders;
