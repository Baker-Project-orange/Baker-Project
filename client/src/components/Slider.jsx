import React, { useState, useEffect } from 'react';
import cs1 from '../assets/cs1.jpg';
import cs2 from '../assets/cs2.jpg';
import cs3 from '../assets/cs3.jpg';
import cs4 from '../assets/cs4.jpg';
import cs5 from '../assets/cs5.jpg';

const images = [cs1, cs2, cs3, cs4, cs5];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, whiteSpace: 'nowrap' }}
      >
        {images.map((src, index) => (
          <img 
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-[450px] object-cover flex-shrink-0"
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-300'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
