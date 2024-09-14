// import { Link, useLocation } from "react-router-dom";
// import {
//   faUserPlus,
//   faUserShield,
//   faRegistered,
//   faUserCircle,
//   faSignOutAlt,
// } from "@fortawesome/free-solid-svg-icons";
// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@material-tailwind/react";
// import { Context } from "./contextProvider";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Signup } from "./LoginSignupComponents/SignupChef";
// import Register from "../pages/Register";

// import additionalImage from '../assets/8dcd2937317f1f248e3c9e4975c96c2b-removebg-preview.png'
// import  CartSidebar from '../components/sidebarcart'
// import AdminRegister from "../pages/AdminRegister";



// function Header() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isLoggedIn, setIsLoggedIn] = useContext(Context).isLoggedIn;
//   const [isChef, setChef] = useContext(Context).isChef;
//   const [isOpen, setIsOpen] = useState(false);
//   const [pageTitle, setPageTitle] = useState("");

//   useEffect(() => {
//     // Update the page title based on the current path
//     switch (location.pathname) {
//       case "/":
//         setPageTitle("Home");
//         break;
//       case "/RecipeDishList":
//         setPageTitle("Recipes");
//         break;
//       case "/contactUs":
//         setPageTitle("Contact Us");
//         break;
//       case "/AboutUs":
//         setPageTitle("About Us");
//         break;
//       case "/ChefProfile":
//         setPageTitle("Chef Profile");
//         break;
//       default:
//         setPageTitle("");
//     }
//   }, [location]);

//   const handleLogout = () => {
//     sessionStorage.removeItem("chefLogin");
//     setIsLoggedIn(false);
//     setChef(false);
//     setIsOpen(false);
//   };

//   const toggleDropdown = () => setIsOpen(!isOpen);

//   return (
//     <>
//       <div className="font-serif">
//         <div className="relative min-h-screen bg-[#c98d83] text-black">
//           <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
//             <header className="text-white p-6 text-center">
//               <nav>
//                 <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-40 p-4">
//                   <a
//                     href="https://flowbite.com/"
//                     className="flex items-center space-x-3 rtl:space-x-reverse"
//                   ></a>
//                   <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
//                     <button
//                       data-collapse-toggle="navbar-cta"
//                       type="button"
//                       className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//                       aria-controls="navbar-cta"
//                       aria-expanded="false"
//                     >
//                       <span className="sr-only">Open main menu</span>
//                       <svg
//                         className="w-5 h-5"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 17 14"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M1 1h15M1 7h15M1 13h15"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                   <div
//                     className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
//                     id="navbar-cta"
//                   >
//                     <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
//                       <li>
//                         <Link
//                           to="/"
//                           className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:hover:text-amber-900 md:dark:text-blue-500"
//                           aria-current="page"
//                         >
//                           Home
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/user-profile"
//                           className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                         >
//                           profile
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/RecipeDishList"
//                           className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                         >
//                           Recipes
//                         </Link>
//                       </li>
                      // <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                      //   <img
                      //     src="../src/assets/image.png"
                      //     alt=""
                      //     className="w-[100px]"
                      //   />
                      // </span>
//                       <li>
//                         <Link
//                           to="/contactUs"
//                           className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                         >
//                           Reach Out
//                         </Link>
//                       </li>
//                       <li>
//                         <Link
//                           to="/AboutUs"
//                           className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                         >
//                           Who We Are
//                         </Link>
//                       </li>

//                       <li className="relative group">
//                         <button
//                           onClick={toggleDropdown}
//                           className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
//                         >
//                           {!isLoggedIn ? "Register" : "Profile"}{" "}
//                         </button>
//                         <ul
//                           className={`absolute ${
//                             isOpen ? "block" : "hidden"
//                           } bg-white shadow-lg rounded-lg mt-2 min-w-[160px] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100`}
//                         >
//                           {!isLoggedIn ? (
//                             <>
//                               <li>
//                                 <Signup />
//                               </li>
//                               <li>
//                                 {" "}
//                                 <AdminRegister />{" "}
//                               </li>{" "}
//                               <li>
//                                 <Register />
//                               </li>
//                             </>
//                           ) : (
//                             <>
//                               <li>
//                                 <Button
//                                   onClick={() => navigate("/ChefProfile")}
//                                   variant="text"
//                                   className="text-black w-full hover:bg-gray-200"
//                                   color="white"
//                                 >
//                                   Profile
//                                 </Button>
//                               </li>
//                               <li>
//                                 <Button
//                                   onClick={handleLogout}
//                                   variant="text"
//                                   className="text-black w-full hover:bg-gray-200"
//                                   color="white"
//                                 >
//                                   Logout
//                                 </Button>
//                               </li>
//                             </>
//                           )}
//                         </ul>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </nav>
//             </header>

//             {/* Dynamic text in the middle of the curve */}
//             <div className="absolute top-96 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
//               <h1 className="text-4xl font-bold text-white">{pageTitle}</h1>
//             </div>

//             <svg
//               className="relative block w-[calc(282%+1.3px)] h-[370px]"
//               data-name="Layer 1"
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 1200 120"
//               preserveAspectRatio="none"
//             >
//               <path
//                 d="M485.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
//                 className="fill-white"
//               ></path>
//             </svg>
//           </div>
//           {/* <img
//           src={additionalImage} // Replace with your image path
//           alt="Additional"
//           className="w-4/4 h-auto object-cover mx-auto -mt-[460px]" // Adjust width as needed
//           style={{ maxWidth: "900px" }} // Optional: Set a max-width for better control
//         /> */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Header;


import { Link, useLocation } from "react-router-dom";
import {
  faUserPlus,
  faUserShield,
  faRegistered,
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Context } from "./contextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Signup } from "./LoginSignupComponents/SignupChef";
import Register from "../pages/Register";

import additionalImage from "../assets/8dcd2937317f1f248e3c9e4975c96c2b-removebg-preview.png";
import CartSidebar from "../components/sidebarcart";
import AdminRegister from "../pages/AdminRegister";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useContext(Context).isLoggedIn;
  const [isChef, setChef] = useContext(Context).isChef;
  const [isOpen, setIsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem("userId");
    if (userId) {
      setIsLoggedIn(true);
    }

    // Update the page title based on the current path
    switch (location.pathname) {
      case "/":
        setPageTitle("Fresh breads handcrafted daily");
        break;
      case "/RecipeDishList":
        setPageTitle("Recipes");
        break;
      case "/contactUs":
        setPageTitle("Contact Us");
        break;
      case "/AboutUs":
        setPageTitle("About Us");
        break;
      case "/ChefProfile":
        setPageTitle("Chef Profile");
        break;
      default:
        setPageTitle("");
    }
  }, [location, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    sessionStorage.removeItem("chefLogin");
    setIsLoggedIn(false);
    setChef(false);
    setIsOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLogin = (userId) => {
    localStorage.setItem("userId", userId);
    setIsLoggedIn(true);
  };

  return (
    <>
      <div className="font-serif">
        <div className="relative min-h-screen bg-[#c98d83] text-black">
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <header className="text-white p-6 text-center">
              <nav>
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto my-40 p-4">
                  <a
                    href="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                  >
                    {/* <img
                      src="../src/assets/image.png"
                      alt=""
                      className="w-[100px]"
                    /> */}
                  </a>
                  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    <button
                      data-collapse-toggle="navbar-cta"
                      type="button"
                      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      aria-controls="navbar-cta"
                      aria-expanded="false"
                    >
                      <span className="sr-only">Open main menu</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 17 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h15M1 7h15M1 13h15"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-cta"
                  >
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                      <li>
                        <Link
                          to="/"
                          className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:hover:text-amber-900 md:dark:text-blue-500"
                          aria-current="page"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/user-profile"
                          className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/RecipeDishList"
                          className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                          Recipes
                        </Link>
                      </li>
                      <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
                        <img
                          src="../src/assets/image.png"
                          alt=""
                          className="w-[100px]"
                        />
                      </span>
                      <li>
                        <Link
                          to="/contactUs"
                          className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                          Reach Out
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/AboutUs"
                          className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                          Who We Are
                        </Link>
                      </li>

                      <li className="relative group">
                        <button
                          onClick={toggleDropdown}
                          className="block py-2 px-3 md:p-0 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-amber-900 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                          {isLoggedIn ? "Profile" : "Register"}
                        </button>
                        <ul
                          className={`absolute ${
                            isOpen ? "block" : "hidden"
                          } bg-white shadow-lg rounded-lg mt-2 min-w-[160px] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100`}
                        >
                          {!isLoggedIn ? (
                            <>
                              <li>
                                <Signup onLogin={handleLogin} />
                              </li>
                              <li>
                                <AdminRegister onLogin={handleLogin} />
                              </li>
                              <li>
                                <Register onLogin={handleLogin} />
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                <Button
                                  onClick={() => navigate("/ChefProfile")}
                                  variant="text"
                                  className="text-black w-full hover:bg-gray-200"
                                  color="white"
                                >
                                  Profile
                                </Button>
                              </li>
                              <li>
                                <Button
                                  onClick={handleLogout}
                                  variant="text"
                                  className="text-black w-full hover:bg-gray-200"
                                  color="white"
                                >
                                  Logout
                                </Button>
                              </li>
                            </>
                          )}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </header>

            {/* Dynamic text in the middle of the curve */}
            <div className="absolute top-96 md:left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <h1 className="text-4xl font-bold text-white">{pageTitle}</h1>
            </div>

            <svg
              className="relative block w-[calc(282%+1.3px)] h-[370px]"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M485.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="fill-white"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;