// src/SliderSection.jsx

import React, { useState } from 'react';
import b3Image from '../assets/b3.png'; // Correctly import the image

const slides = [
  {
    id: 1,
    image: b3Image, // Use the imported image here
    title: "Wheat cookies",
    description:
      "Duis vehicula, enim vel fermentum porta, augue enim ullamcorper metus, vel pellentesque libero est sit amet velit. Nullam sit amet velit dictum, vehicula purus ac, posuere nibh. Proin maximus maximus odio.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    title: "Sesame cookies",
    description:
      "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat accumsan et iusto odio dignissim.",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  return (
    <section className="mt-[170px]">
      <div className="relative w-[850px] mx-auto">
        <div className="overflow-hidden relative">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out transform ${
                index === currentIndex ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="bg-white p-4 rounded text-center">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="mb-0 mt-24 max-w-[280px] h-[210px] rounded mx-auto"
                />
                <h3 className="text-xl font-semibold mb-2">{slide.title}</h3>
                <p className="text-gray-700 w-[300px] mx-auto">
                  {slide.description}
                </p>
                <button className="bg-amber-900 h-12 w-30 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-full">
                  Show info
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full focus:outline-none"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default Slider;
