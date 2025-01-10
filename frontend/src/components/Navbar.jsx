"use client";

import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import logo from "../assets/logo.svg";
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const [navbar, setNavbar] = useState(false);
  
  const { user } = useAuth();



  return (
    <div>
      <nav className="w-full  bg-[#fdfbf9]  top-0 left-0 right-0 z-10">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="font-medium flex flex-inline">
            <div className="   items-center justify-between  md:block">
            <img src={logo} style={{width : "70px"}}/>
            </div>

            <span className="mt-6 text-orange-400">LuxeStay</span>
              {/* HAMBURGER BUTTON FOR MOBILE */}
              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block h-auto" : "hidden"
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex ">
              <li className="pb-6 text-xl  text-orange-700 py-2 md:px-6 text-center border-b-2 md:border-b-0">
                  <a href="#about">
                    About
                  </a>
                </li>
                <li className="pb-6 text-xl  text-orange-700 py-2 md:px-6 text-center border-b-2 md:border-b-0">
                  <a href="#portfolio" >
                  Rooms
                  </a>
                </li>
                <li className="pb-6 text-xl  text-orange-700 py-2 md:px-6 text-center border-b-2 md:border-b-0">
                  <a href="#blog" >
                    Explore
                  </a>
                </li>
                <li className="pb-6 text-xl  text-orange-700 py-2 md:px-6 text-center border-b-2 md:border-b-0">
                <Link to="/dining" className="block md:inline">
                    Dining
                 </Link>
                </li>
                <li className="pb-6 text-xl  text-orange-700 py-2 md:px-6 text-center border-b-2 md:border-b-0">
                  <a href="#contact" >
                    Contact
                  </a>
                </li>
                {!user ? (
              <>
                  <li className="pb-6 text-xl  text-orange-700 py-2 md:px-6 text-center border-b-2 md:border-b-0">
                  <Link to="/signin" className="block md:inline">Signin</Link>
                </li>
                <li className="pb-6 text-xl  text-orange-700 py-2 md:px-6 text-center border-b-2 md:border-b-0">
                  <Link
                    to="/signup"
                    className="block md:inline bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <div className="">
             
                <li className="pb-6 text-xl  text-orange-700 py-2 md:px-6 text-center border-b-2 md:border-b-0">
                <Link
                    to="/dashboard"
                    className="block md:inline bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
                  >
               {user.name}
               </Link>
                </li>
                
              </div>
            )}
              </ul>
            </div>
          </div>
        </div>
        
      </nav>
    </div>
  );
}

export default NavBar;