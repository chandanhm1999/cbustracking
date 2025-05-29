// components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { FaSearchLocation } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left - Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/mlogo.svg"
              alt="Logo"
              width={140}
              className="h-8 sm:h-10 md:h-12 w-auto"
            />
          </Link>
        </div>

        {/* Center - Nav Links for Desktop */}
        <div className="hidden sm:flex flex-1 justify-center text-sm uppercase font-semibold text-gray-800 gap-6">
          {["Routes", "Search", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-[#883d73] transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right - Call Us Button for Desktop */}
        <div className="hidden sm:flex justify-end flex-1">
          <Link
            to="/search"
            className="bg-gradient-to-r from-[#572649] via-[#2d1526] to-[#883d73] text-white px-5 py-2 rounded-xs shadow-md hover:shadow-xl hover:bg-orange-500 transition-all duration-300 flex items-center gap-2 uppercase text-sm font-semibold"
          >
            <FaSearchLocation className="w-4 h-4 text-white" />
            <span>Search</span>
          </Link>
        </div>

        {/* Mobile Nav and Call Button */}
        <div className="flex sm:hidden items-center gap-3 text-xs font-medium text-gray-800">
          {["Routes", "Search", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-[#883d73] transition"
            >
              {item}
            </Link>
          ))}

          <Link
            to="/search"
            className="bg-gradient-to-r from-[#572649] via-[#2d1526] to-[#883d73] border-[#2d1526] border-2 text-white px-2 py-1 rounded-xs font-semibold hover:bg-orange-500 transition flex items-center gap-1"
          >
            <FaSearchLocation className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
