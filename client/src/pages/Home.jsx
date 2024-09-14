// src/HomePage.jsx

import backgroundImage from "../assets/black.jpg"; // Make sure the path matches your file structure
import additionalImage from "../assets/8dcd2937317f1f248e3c9e4975c96c2b-removebg-preview.png"; // Replace with your image path
import h1 from "../assets/h1.jpg";
import h2 from "../assets/h2.jpg";
import h3 from "../assets/h3.jpg";
import h4 from "../assets/h4.jpg";
import { useNavigate } from "react-router-dom";

import Slider from "../components/Slider"; // Import the slider component
import chefHat from "../assets/chefHat.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCookieBite,
  faBreadSlice,
  faCandyCane,
  faCake,
} from "@fortawesome/free-solid-svg-icons"; // استخدام أيقونة الخبز faBreadSlice
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Home1() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contactUs");
  };
  return (
    <>
      <Header />
      <div className="containerr">
        {/* Navbar should be here */}
        {/* Image below the Navbar */}
        <div className="relative mt-[50px]">
          {" "}
          {/* Adjust margin to raise the image */}
          <img
            src={additionalImage} // Replace with your image path
            alt="Additional"
            className="w-4/4 h-auto object-cover mx-auto -mt-[460px]" // Adjust width as needed
            style={{ maxWidth: "900px" }} // Optional: Set a max-width for better control
          />
        </div>
        <p className="text-center text-2xl text-[#78350F] max-w-3lg w-[800px] mx-auto  leading-relaxed font-serif font-bold mb-16 mt-16 tracking-tight whitespace-break-spaces">
          Experience the art of artisanal bread with our daily handcrafted
          loaves. Crafted with care and premium ingredients,each loaf delivers
          unmatched quality and flavor. Enjoy freshly baked excellence in every
          slice.
        </p>
        <section>
          <div
            className="relative w-screen h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-white text-4xl text-center font-serif italic font-semibold mb-8 mt-56">
                learn about the history{" "}
                <p>
                  <span className="text-[#FFC4C4]">of baking</span>
                </p>
              </p>

              {/* Grid layout with 4 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-3 mx-60">
                {/* Column 1 */}
                <div className="text-[#FFC4C4] p-2 rounded text-center ">
                  <h3 className="text-xl font-semibold mb-7">3000 BC</h3>
                  <p className="text-gray-200 ">
                    The Birth of Bread:
                    <p>
                      Ancient Egyptians bake the earliest known leavened bread,
                      using natural fermentation.
                    </p>
                  </p>
                  <img
                    src={h1}
                    alt="card-image"
                    className="max-w-[280px] h-[250px] rounded mx-auto mt-32 w-[250px]"
                  />
                </div>

                {/* Column 2 */}
                <div className="text-[#FFC4C4] p-2 rounded text-center">
                  <h3 className="text-xl font-semibold mb-2">1800 AD</h3>
                  <p className="text-gray-200">
                    Industrial Baking Begins:{" "}
                    <p>
                      The invention of commercial yeast and mechanized milling
                      transforms bread production and accessibility.
                    </p>
                  </p>
                  <img
                    src={h2}
                    alt="card-image"
                    className="max-w-[280px] h-[250px] rounded mx-auto mt-32 w-[250px]"
                  />
                </div>

                {/* Column 3 */}
                <div className="text-[#FFC4C4] p-2 rounded text-center relative">
                  <h3 className="text-xl font-semibold mb-2">1800 AD</h3>
                  <p className="text-gray-200 mb-4">
                    Industrial Baking Begins:
                    <br />
                    The invention of commercial yeast and mechanized milling
                    transforms bread production and accessibility.
                  </p>
                  <img
                    src={h3}
                    alt="card-image"
                    className="max-w-[280px] h-[250px] rounded mx-auto mt-32 w-[250px]"
                  />
                </div>

                {/* Column 4 */}
                <div className="text-[#FFC4C4] p-2 rounded text-center">
                  <h3 className="text-xl font-semibold mb-2">2000 AD</h3>
                  <p className="text-gray-200 m-0">
                    Artisanal Revival:{" "}
                    <span className="m-0">
                      A resurgence of artisanal baking celebrates traditional
                      methods, quality ingredients, and the rich heritage of
                      bread-making.
                    </span>
                  </p>
                  <img
                    src={h4}
                    alt="card-image"
                    className="max-w-[280px] h-[250px] rounded mx-auto mt-32 w-[250px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        2
        <section className="mt-[200px] ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto px-4">
            {/* Text Column */}
            <div className="flex flex-col justify-center items-center text-center">
              <p className="text-[#FFC4C4] text-5xl font-serif italic font-semibold mb-4">
                Coming Soon!
              </p>
              <p className="text-[#78350F] text-2xl leading-relaxed font-serif font-bold">
                Meet our original products
                <span className="block">made with love</span>
                {/* <span className="block">with love</span> */}
              </p>
            </div>
            {/* Slider Column */}
            <div className="flex justify-center items-center">
              <Slider />
            </div>
          </div>
        </section>
        <section className="relative mt-32 w-screen h-[110vh]">
          <div className="relative w-full h-full">
            <img
              src="../src/assets/contact3.jpg" // Replace with your image path
              alt="Decorative"
              className="w-full h-full object-cover rounded"
            />

            {/* Overlay Text Container */}
            <div
              className="absolute inset-0 flex flex-col justify-center items-center text-center p-4"
              style={{ marginLeft: "9%" }}
            >
              <p className="text-amber-950 text-4xl font-serif italic font-semibold">
                Our speciality - <br />
                <span>traditional donuts!</span>
              </p>

              <p className="text-[#78350F] max-w-lg leading-relaxed font-serif font-bold mt-6">
                Mauris rhoncus orci in imperdiet placerat. Vestibulum euismod
                nisl suscipit ligula volutpat, a feugiat urna maximus. Cras
                massa nibh, tincidunt ut eros a, vulputate consequat odio.
              </p>
              {/* <button className="bg-[#78350F] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full mt-8 w-32">
              <Link to="/contactUs" />
              Contact us
            </button> */}
              <button
                onClick={handleClick}
                className="bg-[#78350F] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded-full mt-8 w-32"
              >
                Contact us
              </button>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </>
  );
}

export default Home1;
