import React, { useState } from "react";
import { FaBus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <FaBus />
            <span>CBus Tracker</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8">
            <li>
              <Link to="/routes" className="hover:text-yellow-400">
                Routes
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-yellow-400">
                Search
              </Link>
            </li>
            <li>
              <a href="#services" className="hover:text-yellow-400">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-yellow-400">
                Search
              </a>
            </li>
          </ul>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col space-y-1.5 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transition duration-300 ease-in-out ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 px-4 pt-2 pb-4 space-y-2 origin-top overflow-hidden transition-transform duration-300 ease-in-out ${
          isOpen ? "scale-y-100" : "scale-y-0"
        }`}
      >
        <a
          href="#home"
          className="block py-1 text-white hover:text-yellow-400"
          onClick={() => setIsOpen(false)}
        >
          Home
        </a>
        <a
          href="#about"
          className="block py-1 text-white hover:text-yellow-400"
          onClick={() => setIsOpen(false)}
        >
          About
        </a>
        <a
          href="#services"
          className="block py-1 text-white hover:text-yellow-400"
          onClick={() => setIsOpen(false)}
        >
          Services
        </a>
        <a
          href="#contact"
          className="block py-1 text-white hover:text-yellow-400"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
