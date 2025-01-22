import React from 'react';
import { Data } from '../assets/Gallery/Data.js';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

export const Gallery = () => {
  const slide = (direction) => {
    const slider = document.getElementById('slider');
    const scrollAmount = 500;
    slider.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
  };

  return (
    <div id='gallery' className="gallery-container  py-8">
      {/* Header Section */}
      <div className="text-center mb-6 pt-10">
        <h1 className="text-3xl lg:text-4xl font-bold text-primary1">
          Our Gallery
        </h1>
        <p className="text-gray-500 mt-2 text-lg lg:text-xl">
          Explore moments captured beautifully.
        </p>
      </div>

      {/* Gallery Slider */}
      <div className="relative flex items-center group">
        {/* Left Chevron */}
        <MdChevronLeft
          className="hidden group-hover:block absolute left-4 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer text-gray-600 hover:text-orange-600 hover:scale-110 transition-all duration-300"
          onClick={() => slide('left')}
          size={40}
        />

        {/* Slider */}
        <div
          id="slider"
          className="w-full h-full overflow-hidden whitespace-nowrap scroll-smooth relative rounded-lg "
        >
          {Data.map((item, index) => (
            <div
              key={index}
              className="inline-block w-[300px] mx-4  rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 "
            >
              <img
                className="w-full h-[200px] object-cover"
                src={item.img}
                alt={`Gallery item ${index + 1}`}
              />
             
            </div>
          ))}
        </div>

        {/* Right Chevron */}
        <MdChevronRight
          className="hidden group-hover:block absolute right-4 z-10 bg-white p-2 rounded-full shadow-md cursor-pointer text-gray-600 hover:text-orange-600 hover:scale-110 transition-all duration-300"
          onClick={() => slide('right')}
          size={40}
        />
      </div>
    </div>
  );
};
