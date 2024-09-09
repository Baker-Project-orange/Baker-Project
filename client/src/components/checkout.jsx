
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PayPalButton from "./pyamentbutton";
// import PaymentDetails from "./paymentdetails";
// import Swal from "sweetalert2";

// const CheckoutComponent = () => {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     loadCartFromLocalStorage();
//   }, []);

//   const loadCartFromLocalStorage = () => {
//     try {
//       const storedCart = localStorage.getItem("cart");
//       if (storedCart) {
//         setCart(JSON.parse(storedCart));
//       } else {
//         setCart([]);
//       }
//     } catch (error) {
//       console.error("Error loading cart from localStorage:", error);
//       setCart([]);
//     }
//   };

//   const handlePayPalSuccess = (details, data) => {
//     Swal.fire({
//       title: "Payment Successful!",
//       text: "Thank you for your purchase.",
//       icon: "success",
//       confirmButtonColor: "#c98d83",
//     });
//     localStorage.removeItem("cart");
//     setCart([]);
//   };

//   const totalAmount = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <div className="min-h-screen bg-[#f8f4f2] p-6 font-serif">
//       <div className="max-w-4xl mx-auto">
//         {/* Cart Summary */}
//         <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//           <h2 className="text-2xl font-semibold mb-4 text-[#c98d83]">
//             Cart Summary
//           </h2>
//           {cart.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center mb-4 border-b border-gray-200 pb-4"
//             >
//               <img
//                 src={item.recipe.overviewPicture}
//                 alt={item.name}
//                 className="w-16 h-16 object-cover rounded-md mr-4"
//               />
//               <div className="flex-1">
//                 <div className="font-semibold text-lg text-[#c98d83]">
//                   {item.name}
//                 </div>
//                 <div className="text-gray-600">
//                   ${item.price.toFixed(2)} x {item.quantity}
//                 </div>
//               </div>
//               <div className="text-lg font-semibold text-[#c98d83]">
//                 ${(item.price * item.quantity).toFixed(2)}
//               </div>
//             </div>
//           ))}
//           <div className="text-xl font-bold text-[#c98d83] text-right">
//             Total: ${totalAmount.toFixed(2)}
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Order Summary */}
//           <div className="md:w-1/2">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-semibold mb-4 text-[#c98d83]">
//                 Order Summary
//               </h2>
//               <ul className="list-disc pl-5 text-gray-600">
//                 <li>Free shipping on orders over $50</li>
//                 <li>30-day return policy</li>
//                 <li>24/7 customer support</li>
//                 <li>Secure payment processing</li>
//               </ul>
//               <button
//                 onClick={() => navigate("/")}
//                 className="mt-6 text-white bg-[#c98d83] py-2 px-6 rounded-full hover:bg-[#b87c6d] transition duration-300"
//               >
//                 &larr; Continue Shopping
//               </button>
//             </div>
//           </div>

//           {/* Payment Details */}
//           <div className="md:w-1/2">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h2 className="text-2xl font-semibold mb-4 text-[#c98d83]">
//                 Payment Details
//               </h2>
//               <PayPalButton
//                 amount={totalAmount.toFixed(2)}
//                 onSuccess={handlePayPalSuccess}
//                 options={{
//                   clientId: "YOUR_PAYPAL_CLIENT_ID",
//                   currency: "USD",
//                 }}
//                 style={{
//                   layout: "vertical",
//                   color: "gold",
//                   shape: "rect",
//                   label: "paypal",
//                 }}
//               />
//               <PaymentDetails />
//             </div>
//           </div>
//         </div>

//         {/* Chef Image - Now full width */}
//         <div className="mt-6 bg-white rounded-lg shadow-md p-6 flex items-center">
//           <img
//             src="https://i.imgur.com/JcwCcjH.gif"
//             alt="Chef preparing food"
//             className="w-1/4 rounded-lg"
//           />
//           <div className="ml-6 md:text-center flex-1">
//             <p className="text-[#c98d83] font-semibold font-serif text-2xl md: mb-4">
//               Enjoy your meal!
//             </p>
//             <p className="text-gray-600 mt-2 font-serif text-2xl">
//               Thank you for choosing our dishes
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutComponent;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./pyamentbutton";
import PaymentDetails from "./paymentdetails";

import Swal from "sweetalert2";

const CheckoutComponent = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  const loadCartFromLocalStorage = () => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      setCart([]);
    }
  };

  const handlePayPalSuccess = (details, data) => {
    Swal.fire({
      title: "Payment Successful!",
      text: "Thank you for your purchase.",
      icon: "success",
      confirmButtonColor: "#c98d83",
    });
    localStorage.removeItem("cart");
    setCart([]);
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f8f4f2] p-6 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-[#c98d83]">
            Cart Summary
          </h2>
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center mb-4 border-b border-gray-200 pb-4"
            >
              <img
                src={item.recipe?.overviewPicture || "default-image-url"} // Provide a fallback image URL
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg text-[#c98d83]">
                  {item.name}
                </div>
                <div className="text-gray-600">
                  ${item.price.toFixed(2)} x {item.quantity}
                </div>
              </div>
              <div className="text-lg font-semibold text-[#c98d83]">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="text-xl font-bold text-[#c98d83] text-right">
            Total: ${totalAmount.toFixed(2)}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Order Summary */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#c98d83]">
                Order Summary
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Free shipping on orders over $50</li>
                <li>30-day return policy</li>
                <li>24/7 customer support</li>
                <li>Secure payment processing</li>
              </ul>
              <button
                onClick={() => navigate("/")}
                className="mt-6 text-white bg-[#c98d83] py-2 px-6 rounded-full hover:bg-[#b87c6d] transition duration-300"
              >
                &larr; Continue Shopping
              </button>
            </div>
          </div>

          {/* Payment Details */}
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#c98d83]">
                Payment Details
              </h2>
              <PayPalButton
                amount={totalAmount.toFixed(2)}
                onSuccess={handlePayPalSuccess}
                options={{
                  clientId: "YOUR_PAYPAL_CLIENT_ID",
                  currency: "USD",
                }}
                style={{
                  layout: "vertical",
                  color: "gold",
                  shape: "rect",
                  label: "paypal",
                }}
              />
              <PaymentDetails />
            </div>
          </div>
        </div>

        {/* Chef Image - Now full width */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 flex items-center">
          <img
            src="https://i.imgur.com/JcwCcjH.gif"
            alt="Chef preparing food"
            className="w-1/4 rounded-lg"
          />
          <div className="ml-6 md:text-center flex-1">
            <p className="text-[#c98d83] font-semibold font-serif text-2xl md: mb-4">
              Enjoy your meal!
            </p>
            <p className="text-gray-600 mt-2 font-serif text-2xl">
              Thank you for choosing our dishes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutComponent;
