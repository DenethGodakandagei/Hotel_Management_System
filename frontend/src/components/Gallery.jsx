import React from 'react'
import { Data } from '../assets/Gallery/Data.js';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
export const Gallery = () => {
    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
      };
    
      const slideRight = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
      };
  return (
    <div>
          <div class="w-full pl-5 lg:pl-2 mb-4 mt-4" id='gallery'>
            <h1 class="text-3xl lg:text-4xl text-orange-400 font-extrabold text-center p-12">
             Our Gallery
            </h1>
          </div>
      <div className='relative flex items-center over reveal'>
        <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-150' onClick={slideLeft} size={40} />
        <div
          id='slider'
          className='w-full h-full overflow-x-scroll overflow-y-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide '
        >
          {Data.map((item) => (
            <img
              className='w-[280px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
              src={item.img}
              alt='/'
            />
          ))}
        </div>
        <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
      </div>
      <div className=' m-12 p-6' ></div>
      
        
    </div>
  )
}