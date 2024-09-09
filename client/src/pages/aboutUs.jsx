import React from "react";
import { Cake, ShoppingBag, Users, Star } from "lucide-react";
import additionalImage from "../assets/8dcd2937317f1f248e3c9e4975c96c2b-removebg-preview.png"; // Replace with your image path
import Header from "../components/Header";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      <Header />

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
      <div className="bg-gradient-to-b from-white to-gray-100">
        {/* Hero Section */}
        {/* <section className="relative h-screen bg-[#c98d83]">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center leading-tight">
            Discover the Art of Baking
          </h1>
          <p className="text-xl md:text-3xl text-center max-w-3xl">
            Unleash your culinary creativity with our exquisite recipes and
            premium products
          </p>
        </div>
      </section> */}

        {/* About Us Content */}
        <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-[#c98d83]">
                Our Story
              </h2>
              <p className="text-gray-700 mb-6 text-lg">
                We are passionate bakers and culinary enthusiasts dedicated to
                bringing the joy of baking to homes around the world. Our
                platform offers a curated collection of free recipes and
                exclusive premium creations from master chefs.
              </p>
              <p className="text-gray-700 text-lg">
                Our mission is to inspire home bakers, providing them with the
                knowledge, tools, and confidence to create extraordinary baked
                goods in their own kitchens.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: Cake,
                  title: "Diverse Recipes",
                  description: "Hundreds of recipes for all occasions",
                },
                {
                  icon: ShoppingBag,
                  title: "Premium Content",
                  description: "Exclusive recipes from top chefs",
                },
                {
                  icon: Users,
                  title: "Vibrant Community",
                  description: "Share experiences and tips",
                },
                {
                  icon: Star,
                  title: "Guaranteed Quality",
                  description: "Tested and perfected recipes",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg text-center transform transition duration-500 hover:scale-105"
                >
                  <item.icon className="w-16 h-16 mx-auto mb-6 text-[#c98d83]" />
                  <h3 className="font-semibold text-xl mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-[#c98d83] py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-12">
              What Our Community Says
            </h2>
            <blockquote className="text-2xl italic mb-8">
              "This platform has revolutionized my baking. The recipes are easy
              to follow, and the results are consistently amazing!"
            </blockquote>
            <p className="font-semibold text-xl">
              - Aya Rimawi, Passionate Home Baker
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white py-24 px-4 md:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#c98d83]">
            Ready to Start Your Baking Journey?
          </h2>
          <p className="mb-10 text-xl text-gray-700 max-w-2xl mx-auto">
            Join us today and discover a world of delicious flavors and creative
            possibilities
          </p>
          <Link to={"/"}> 
          <button className="bg-[#c98d83] text-white font-bold py-4 px-10 rounded-full text-xl hover:bg-opacity-90 transition duration-300 transform hover:scale-105">
            Get Started Now
          </button></Link>
        </section>
      </div>
    </>
  );
};

export default AboutUs;
