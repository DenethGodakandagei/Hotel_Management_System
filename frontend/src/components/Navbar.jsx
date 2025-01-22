"use client";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Automatically close the navbar when navigating to a new page
  useEffect(() => {
    setNavbarOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-[#fdfbf9] shadow-md fixed w-full z-10 top-0 left-0">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <span className="ml-3 text-xl font-semibold text-primary1">
            LuxeStay
          </span>
        </div>

        {/* Hamburger Menu */}
        <button
          className="text-gray-700 md:hidden focus:outline-none"
          onClick={() => setNavbarOpen(!navbarOpen)}
        >
          {navbarOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            navbarOpen ? "block" : "hidden"
          } md:block absolute md:relative bg-white lg:-top-1 md:bg-transparent top-16 left-0 w-full md:w-auto transition-all duration-300 md:transition-none z-50 shadow-lg md:shadow-none`}
        >
          <ul className="flex flex-col md:flex-row md:items-center md:space-x-6 mt-4 md:mt-0 p-6 md:p-0">
            <li>
              <a
                href="#about"
                className="text-primary1 text-lg hover:text-primary2 block md:inline-block"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#rooms"
                className="text-primary1 text-lg hover:text-primary2 block md:inline-block"
              >
                Rooms
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className="text-primary1 text-lg hover:text-primary2 block md:inline-block"
              >
                Gallery
              </a>
            </li>
            <li>
              <a
                href="#dining"
                className="text-primary1 text-lg hover:text-primary2 block md:inline-block"
              >
                Dining
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-primary1 text-lg hover:text-primary2 block md:inline-block"
              >
                Contact
              </a>
            </li>
            {!user ? (
              <>
                <li>
                  <Link
                    to="/signin"
                    className="text-primary1 text-lg hover:text-primary2 block md:inline-block"
                  >
                    Signin
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="text-white bg-primary1 px-4 py-2 rounded-md hover:bg-primary2 block md:inline-block"
                  >
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/dashboard"
                  className="text-white bg-primary1 px-4 py-2 rounded-md hover:bg-primary2 block md:inline-block"
                >
                  {user.name}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
