import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import cs2 from "../assets/cs2.jpg";
import cs3 from "../assets/cs3.jpg";
import cs1 from "../assets/cs1.jpg";

const CenteredCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  CenteredCarousel.propTypes = {
    images: PropTypes.array.isRequired,
  };

  // Providing default props if needed
  CenteredCarousel.defaultProps = {
    images: [cs1, cs2, cs3],
  };

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Change every 5 seconds

      return () => clearInterval(interval);
    }
  }, [images]);

  const nextSlide = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevSlide = () => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-lg shadow-lg relative">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-lg hover:bg-opacity-75 transition-all duration-300"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-lg hover:bg-opacity-75 transition-all duration-300"
      >
        &#10095;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CenteredCarousel;
