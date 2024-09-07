// src/HomePage.jsx

import backgroundImage from "../assets/black.jpg"; // Make sure the path matches your file structure
import additionalImage from "../assets/8dcd2937317f1f248e3c9e4975c96c2b-removebg-preview.png"; // Replace with your image path
import h1 from'../assets/h1.jpg';
import h2 from'../assets/h2.jpg';
import h3 from'../assets/h3.jpg';
import h4 from'../assets/h4.jpg';
import Slider from '../components/Slider'; // Import the slider component


function Home() {
  return (
    <div className="containerr">
      {/* Navbar should be here */}
      
      {/* Image below the Navbar */}
      <div className="relative mt-[-50px]"> {/* Adjust margin to raise the image */}
        <img
          src={additionalImage} // Replace with your image path
          alt="Additional"
          className="w-4/4 h-auto object-cover mx-auto -mt-96" // Adjust width as needed
          style={{ maxWidth: '600px' }} // Optional: Set a max-width for better control
        />
      </div>
      
      <p className="text-center text-xl text-amber-900 max-w-lg mx-auto leading-relaxed font-serif font-bold mb-16 mt-16">
        Experience the art of artisanal bread with our daily handcrafted loaves.
        Crafted with care and premium ingredients, each loaf delivers unmatched
        quality and flavor. Enjoy freshly baked excellence in every slice.
      </p>
      <section>
        <div
          className="relative w-screen h-screen bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-white text-4xl text-center font-serif italic font-semibold mb-12 mt-20">
              learn about the history{" "}
              <p>
                <span className="text-[#FFC4C4]">of baking</span>
              </p>
            </p>

            {/* Grid layout with 4 columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 mx-24">
              {/* Column 1 */}
              <div className="text-[#FFC4C4] p-4 rounded text-center">
                <h3 className="text-xl font-semibold mb-2">3000 BC</h3>
                <p className="text-gray-200">
                  The Birth of Bread:
                  <p>
                    Ancient Egyptians bake the earliest known leavened bread,
                    using natural fermentation.
                  </p>
                </p>
                <img
                  src={h1}
                  alt="card-image"
                  className="max-w-[280px] h-[210px] rounded mx-auto mt-52 w-[250px]"
                />
              </div>

              {/* Column 2 */}
              <div className="text-[#FFC4C4] p-4 rounded text-center">
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
                  className="max-w-[280px] h-[210px] rounded mx-auto mt-52 w-[250px]"
                />
              </div>

              {/* Column 3 */}
              <div className="text-[#FFC4C4] p-4 rounded text-center relative">
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
                  className="max-w-[280px] h-[210px] rounded mx-auto mt-52 w-[250px]"
                />
              </div>

              {/* Column 4 */}
              <div className="text-[#FFC4C4] p-4 rounded text-center">
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
                  className="max-w-[280px] h-[210px] rounded mx-auto mt-52 w-[250px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-[170px]">
        <div>
          <p className="text-center text-[#FFC4C4] text-5xl max-w-lg mx-auto leading-relaxed">
            What we Produce?
          </p>
          <p className="text-center text-amber-900 text-2xl max-w-lg mx-auto leading-relaxed font-serif font-bold">
            Meet our original products<p>made</p>
            <p>with love</p>
          </p>
        </div>
<Slider /> 
      </section>
    </div>
  );
}

export default Home;
