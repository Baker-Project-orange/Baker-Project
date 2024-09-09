// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";

// const CartSidebar = () => {
//   const [cart, setCart] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   const updateQuantity = (index, change) => {
//     const updatedCart = cart.map((item, i) =>
//       i === index
//         ? { ...item, quantity: Math.max(1, item.quantity + change) }
//         : item
//     );
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const removeFromCart = (index) => {
//     const updatedCart = cart.filter((_, i) => i !== index);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const subTotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className="fixed top-4 right-4 z-50 bg-[#c98d83] text-white p-3 rounded-full shadow-lg hover:bg-[#b17a70] transition-colors duration-300"
//       >
//         <ShoppingBag size={24} />
//         <span className="absolute -top-2 -right-2 bg-white text-[#c98d83] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
//           {cart.length}
//         </span>
//       </button>

//       <div
//         className={`fixed top-0 right-0 h-full w-96 bg-[#f9f1ee] shadow-2xl transform transition-transform duration-500 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         } overflow-y-auto z-50`}
//       >
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-8">
//             <h2 className="text-2xl font-bold text-[#c98d83]">
//               Your Bakery Cart
//             </h2>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-[#c98d83] hover:text-[#b17a70] transition-colors duration-300"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           {cart.map((item, index) => (
//             <div
//               key={index}
//               className="flex items-center mb-6 pb-6 border-b border-[#e5d1cb]"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-24 h-24 object-cover rounded-lg mr-4 shadow-md"
//               />
//               <div className="flex-grow">
//                 <h3 className="font-semibold text-[#4a3f3a]">
//                   {item.dishDescription}
//                 </h3>
//                 <p className="text-[#c98d83] font-bold mt-1">
//                   ${item.price.toFixed(2)}
//                 </p>
//                 <div className="flex items-center mt-2 bg-white rounded-full border border-[#c98d83]">
//                   <button
//                     onClick={() => updateQuantity(index, -1)}
//                     className="p-1 text-[#c98d83] hover:bg-[#f0e4e1] rounded-full transition-colors duration-300"
//                   >
//                     <Minus size={16} />
//                   </button>
//                   <span className="mx-3 text-sm font-medium">
//                     {item.quantity}
//                   </span>
//                   <button
//                     onClick={() => updateQuantity(index, 1)}
//                     className="p-1 text-[#c98d83] hover:bg-[#f0e4e1] rounded-full transition-colors duration-300"
//                   >
//                     <Plus size={16} />
//                   </button>
//                 </div>
//               </div>
//               <button
//                 onClick={() => removeFromCart(index)}
//                 className="text-[#c98d83] hover:text-[#b17a70] transition-colors duration-300 ml-2"
//               >
//                 <Trash2 size={20} />
//               </button>
//             </div>
//           ))}

//           <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//             <div className="flex justify-between mb-6">
//               <span className="text-lg font-semibold text-[#4a3f3a]">
//                 Total
//               </span>
//               <span className="text-2xl font-bold text-[#c98d83]">
//                 ${subTotal.toFixed(2)}
//               </span>
//             </div>
//             <button
//               onClick={() => {
//                 navigate("/");
//                 setIsOpen(false);
//               }}
//               className="w-full bg-white text-[#c98d83] py-3 rounded-full mb-3 font-semibold border-2 border-[#c98d83] hover:bg-[#f0e4e1] transition-colors duration-300"
//             >
//               Continue Shopping
//             </button>
//             <button
//               onClick={() => navigate("/checkout")}
//               className="w-full bg-[#c98d83] text-white py-3 rounded-full font-semibold hover:bg-[#b17a70] transition-colors duration-300"
//             >
//               Proceed to Checkout
//             </button>
//             <p className="text-xs text-center mt-4 text-[#8c7b75]">
//               By proceeding to checkout, you agree to our Terms & Conditions
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartSidebar;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";

// const CartSidebar = () => {
//   const [cart, setCart] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isCartBouncing, setIsCartBouncing] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedCart = localStorage.getItem("cart");
//     if (storedCart) {
//       setCart(JSON.parse(storedCart));
//     }
//   }, []);

//   const updateQuantity = (index, change) => {
//     const updatedCart = cart.map((item, i) =>
//       i === index
//         ? { ...item, quantity: Math.max(1, item.quantity + change) }
//         : item
//     );
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//     triggerCartBounce();
//   };

//   const removeFromCart = (index) => {
//     const updatedCart = cart.filter((_, i) => i !== index);
//     setCart(updatedCart);
//     localStorage.setItem("cart", JSON.stringify(updatedCart));
//   };

//   const triggerCartBounce = () => {
//     setIsCartBouncing(true);
//     setTimeout(() => setIsCartBouncing(false), 500);
//   };

//   const subTotal = cart.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   const CartIcon = () => (
//     <svg
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M2 3H4.5L6.5 17H17.5L21 7H8"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <circle cx="10" cy="21" r="1" fill="currentColor" />
//       <circle cx="17" cy="21" r="1" fill="currentColor" />
//       <path
//         d="M15 11L17 9L19 11"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );

//   return (
//     <>
//       <button
//         onClick={() => setIsOpen(true)}
//         className={`fixed top-4 right-4 z-50 bg-gradient-to-r from-[#c98d83] to-[#e9b8a8] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${
//           isCartBouncing ? "animate-bounce" : ""
//         }`}
//       >
//         <CartIcon />
//         <span className="absolute -top-2 -right-2 bg-white text-[#c98d83] rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
//           {cart.length}
//         </span>
//       </button>

//       <div
//         className={`fixed top-0 right-0 h-full w-96 bg-gradient-to-b from-[#f9f1ee] to-[#ffffff] shadow-2xl transform transition-transform duration-500 ease-in-out ${
//           isOpen ? "translate-x-0" : "translate-x-full"
//         } overflow-hidden z-50`}
//       >
//         <div className="h-full flex flex-col">
//           <div className="p-6 flex-shrink-0">
//             <div className="flex justify-between items-center mb-8">
//               <h2 className="text-3xl font-extrabold text-[#c98d83] tracking-tight">
//                 Your Sweet Cart 🧁
//               </h2>
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="text-[#c98d83] hover:text-[#b17a70] transition-colors duration-300"
//               >
//                 <X size={28} />
//               </button>
//             </div>
//           </div>

//           <div className="flex-grow overflow-y-auto px-6">
//             {cart.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex items-center mb-6 pb-6 border-b border-[#e5d1cb] last:border-b-0"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded-2xl mr-4 shadow-md transform hover:scale-105 transition-transform duration-300"
//                 />
//                 <div className="flex-grow">
//                   <h3 className="font-semibold text-[#4a3f3a] text-lg">
//                     {item.dishDescription}
//                   </h3>
//                   <p className="text-[#c98d83] font-bold mt-1 text-xl">
//                     ${item.price.toFixed(2)}
//                   </p>
//                   <div className="flex items-center mt-2 bg-white rounded-full border-2 border-[#c98d83] w-fit">
//                     <button
//                       onClick={() => updateQuantity(index, -1)}
//                       className="p-1 text-[#c98d83] hover:bg-[#f0e4e1] rounded-full transition-colors duration-300"
//                     >
//                       <Minus size={18} />
//                     </button>
//                     <span className="mx-3 text-lg font-medium">
//                       {item.quantity}
//                     </span>
//                     <button
//                       onClick={() => updateQuantity(index, 1)}
//                       className="p-1 text-[#c98d83] hover:bg-[#f0e4e1] rounded-full transition-colors duration-300"
//                     >
//                       <Plus size={18} />
//                     </button>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(index)}
//                   className="text-[#c98d83] hover:text-[#b17a70] transition-colors duration-300 ml-2"
//                 >
//                   <Trash2 size={22} />
//                 </button>
//               </div>
//             ))}
//           </div>

//           <div className="p-6 bg-white rounded-t-3xl shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)] flex-shrink-0">
//             <div className="flex justify-between mb-6">
//               <span className="text-xl font-semibold text-[#4a3f3a]">
//                 Total
//               </span>
//               <span className="text-3xl font-bold text-[#c98d83]">
//                 ${subTotal.toFixed(2)}
//               </span>
//             </div>
//             <button
//               onClick={() => {
//                 navigate("/");
//                 setIsOpen(false);
//               }}
//               className="w-full bg-white text-[#c98d83] py-3 rounded-full mb-3 font-bold text-lg border-2 border-[#c98d83] hover:bg-[#f0e4e1] transition-all duration-300 transform hover:scale-105"
//             >
//               Continue Shopping
//             </button>
//             <button
//               onClick={() => navigate("/checkout")}
//               className="w-full bg-gradient-to-r from-[#c98d83] to-[#e9b8a8] text-white py-3 rounded-full font-bold text-lg hover:from-[#b17a70] hover:to-[#d3a497] transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               Proceed to Checkout
//             </button>
//             <p className="text-xs text-center mt-4 text-[#8c7b75]">
//               By proceeding, you're agreeing to our delicious Terms & Conditions
//               🍰
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartSidebar;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, X, Minus, Plus, Trash2 } from "lucide-react";

const CartSidebar = () => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartBouncing, setIsCartBouncing] = useState(false);
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
    triggerCartBounce();
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const triggerCartBounce = () => {
    setIsCartBouncing(true);
    setTimeout(() => setIsCartBouncing(false), 500);
  };

  const subTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const CartIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 3H4.5L6.5 17H17.5L21 7H8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="21" r="1" fill="currentColor" />
      <circle cx="17" cy="21" r="1" fill="currentColor" />
      <path
        d="M15 11L17 9L19 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <div className="font-serif">
        <button
          onClick={() => setIsOpen(true)}
          className={`fixed top-4 right-4 z-50 bg-gradient-to-r from-[#c98d83] to-[#e9b8a8] text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 ${
            isCartBouncing ? "animate-bounce" : ""
          }`}
        >
          <CartIcon />
          <span className="absolute -top-1 -right-1 bg-white text-[#c98d83] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
            {cart.length}
          </span>
        </button>

        <div
          className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-[#f9f1ee] to-[#ffffff] shadow-lg transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } overflow-hidden z-50`}
        >
          <div className="h-full flex flex-col">
            <div className="p-4 flex-shrink-0">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl mt-4  text-[#c98d83] tracking-tight">
                  Your Sweet Cart
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#c98d83] hover:text-[#b17a70] transition-colors duration-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto px-4">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center mb-4 pb-4 border-b border-[#e5d1cb] last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md mr-3 shadow-sm transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-[#4a3f3a] text-md">
                      {item.dishDescription}
                    </h3>
                    <p className="text-[#c98d83] font-bold mt-1 text-lg">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center mt-2 bg-white rounded-full border-2 border-[#c98d83] w-fit">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="p-1 text-[#c98d83] hover:bg-[#f0e4e1] rounded-full transition-colors duration-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2 text-md font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="p-1 text-[#c98d83] hover:bg-[#f0e4e1] rounded-full transition-colors duration-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-[#c98d83] hover:text-[#b17a70] transition-colors duration-300 ml-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white rounded-t-2xl shadow-[0_-5px_10px_-5px_rgba(0,0,0,0.1)] flex-shrink-0">
              <div className="flex justify-between mb-4">
                <span className="text-lg font-semibold text-[#4a3f3a]">
                  Total
                </span>
                <span className="text-2xl font-bold text-[#c98d83]">
                  ${subTotal.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  navigate("/");
                  setIsOpen(false);
                }}
                className="w-full bg-white text-[#c98d83] py-2 rounded-full mb-2 font-bold text-md border-2 border-[#c98d83] hover:bg-[#f0e4e1] transition-all duration-300 transform hover:scale-105"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gradient-to-r from-[#c98d83] to-[#e9b8a8] text-white py-2 rounded-full font-bold text-md hover:from-[#b17a70] hover:to-[#d3a497] transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Proceed to Checkout
              </button>
              <p className="text-xs text-center mt-2 text-[#8c7b75]">
                By proceeding, you're agreeing to our delicious Terms &
                Conditions 🍰
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
