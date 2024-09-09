import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CartSidebar() {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (index, change) => {
    const updatedCart = cart.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-50 bg-pink-500 text-white p-2 rounded-full shadow-lg"
      >
        🛒 {cart.length}
      </button>

      <div
        className={` fixed top-0 right-0 h-full w-80 bg-pink-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto z-50`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex justify-normal gap-2">
              Your cart <p className="text-[#F45757]">({cart.length})</p>
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-2xl bg-red-400 rounded-ss-2xl"
            >
              &times;
            </button>
          </div>

          {cart.map((item, index) => (
            <div key={index} className="flex items-center mb-4 pb-4 border-b">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-medium text-sm">{item.dishDescription}</h3>
                <p className="text-gray-900 font-semibold mt-1">
                  ${item.price.toFixed(2)}
                </p>
                <div className="flex items-center  mt-2 bg-transparent rounded-full w-fit border border-black">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="px-3 py-1 rounded-full"
                  >
                    -
                  </button>
                  <span className="mx-2 text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="px-3 py-1 rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                className="text-gray-400 ml-2"
              >
                🗑️
              </button>
            </div>
          ))}

          <div className="mt-6 bg-[#FBC5C5] p-4  border-t-2 border-black ">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Sub Total</span>
              <span className="font-bold">${subTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
              className="w-full bg-transparent text-black py-2 rounded-full mb-2 font-semibold border border-black"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-[#F45757] text-black py-2 rounded-full font-semibold border border-black"
            >
              Check Out
            </button>
            <p className="text-xs text-center mt-2 text-gray-500">
              By selecting Check Out you are agreeing to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSidebar;
