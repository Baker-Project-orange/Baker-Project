import React, { useEffect, useState } from "react";
import { CreditCard, Plus } from "lucide-react";
import PayPalButton from "./pyamentbutton";
import PaymentDetails from "./paymentdetails";
import { useNavigate } from "react-router-dom";

const CheckoutComponent = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    // Load cart from localStorage
    loadCartFromLocalStorage();
  }, []);
  const loadCartFromLocalStorage = () => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        console.log("Loaded cart from localStorage:", parsedCart);
        setCart(parsedCart);
      } else {
        console.log("No cart found in localStorage");
        setCart([]);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCart([]);
    }
  };

  const handleCheckout = async () => {
    try {
      console.log("Cart state:", cart); // Log the entire cart state

      if (!Array.isArray(cart) || cart.length === 0) {
        console.error("Cart is empty or not in the expected format");
        alert("Your cart is empty. Please add items before checking out.");
        return;
      }

      const orderDetails = cart
        .map((item) => {
          console.log("Processing item:", item); // Log each item
          return `${item.name || "Unknown Product"} x ${item.quantity}`;
        })
        .join(", ");

      const orderPrice = cart.reduce((sum, item) => {
        console.log("Calculating price for item:", item); // Log price calculation
        return sum + item.price * item.quantity;
      }, 0);

      console.log("Sending order to backend:", { orderPrice, orderDetails });

      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderPrice,
          orderDetails,
        }),
      });

      if (response.ok) {
        alert("Checkout successful!");
        // Clear cart in localStorage and state
        localStorage.removeItem("cart");
        setCart([]);
      } else {
        const errorData = await response.json();
        console.error("Checkout failed:", errorData);
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("An error occurred during checkout.");
    }
  };

  return (
    <div className="bg-[#FEF5F5] p-4 ">
      <div className="mx-auto bg-white rounded-lg shadow-xl p-6 ">
        <div className="text-center mb-4 ">
          <h1 className="text-2xl font-bold mr-24">Frozen-Cookie</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-1 ">
          <div className="flex-grow">
            <div className="mb-6 ">
              <div className="flex gap-3 justify-center ">
                <button className="px-1 py-1 "></button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 ml-28">
              <h2 className="text-lg font-semibold mb-4">
                Shippment Information
              </h2>
              <input
                type="email"
                placeholder="Email"
                className="w-[700px] border border-gray-300 rounded px-3 py-2 mb-4"
              />
              <label className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">
                  Send me email and transaction SMS updates about my order. Msg
                  & data rates may apply.
                </span>
              </label>
            </div>

            <div className="mb-6 ml-28 w-[700px]">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <select className="w-full border border-gray-300 rounded px-3 py-2 mb-4">
                <option>Amman</option>
                <option>AL-Zarqa</option>
                <option>Homs</option>
              </select>
              <div className="grid grid-cols-2 gap-4 mb-4 ">
                <input
                  type="text"
                  placeholder="First Name"
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <input
                type="text"
                placeholder="Company (Optional)"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="City"
                  className="border border-gray-300 rounded px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Postal Code (Optional)"
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <input
                type="text"
                placeholder="Phone"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              />
            </div>
            <div className="ml-28">
              <PaymentDetails />
            </div>

            <button
              onClick={handleCheckout}
              className="ml-32 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full w-[300px] border-black outline hover:bg-amber-300 hover:scale-95"
            >
              Pay Now
            </button>
          </div>

          <div className="w-full md:w-1/3">
            <div className="bg-pink-100 p-6 rounded">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              {cart.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div>
                    <div className="font-semibold">Name: {item.name}</div>
                    <div className="text-sm text-gray-600">
                      Price: ${item.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </div>
                    <div className="text-sm text-gray-600">
                      Description: {item.dishDescription}
                    </div>
                    <div className="text-sm font-semibold">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                navigate("/");
              }}
              className="mt-4 text-pink-800 font-semibold hover:text-pink-500"
            >
              &lt; Return to Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
