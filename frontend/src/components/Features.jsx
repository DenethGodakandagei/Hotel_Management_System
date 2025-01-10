import React from 'react'
import { Datafearture } from '../assets/Features/DataFeartures.js'
export const Features = () => {
  return (
    <div id='feartures'>
        <div className="container mx-auto ">
        <h1 className="text-3xl lg:text-4xl text-orange-400 font-extrabold text-center p-6">
              Hotel Features
            </h1>
  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
   
    {Datafearture.map((item) => (
       <div className=" text-6xl   rounded-xl p-4 m-2 flex flex-col  justify-center items-center">
            <img
              className='w-[60px] sm:w-[120px] p-2  hover:scale-105 ease-in-out duration-300 flex  justify-center items-centerr'
              src={item.img}
              alt='/'
            />
             <div className="flex flex-col  pb-10">
               <span className=" text-center text-[18px] sm:text-[26px]" >{item.description}</span>
       
    </div>
            </div>
          ))}  
    </div>
</div>
    </div>
  )
}