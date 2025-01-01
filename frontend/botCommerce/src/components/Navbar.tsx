import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCartOutline } from "react-icons/io5";
import { FaUser, FaTimes } from "react-icons/fa"; // Import FaTimes for 'X' icon

import logo from "../assets/logo.jpg";
import { motion } from "framer-motion";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const totalItemsInCart = getTotalItemsInCart();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false); // Close the menu if the screen size is large
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center h-25 relative">
      <div className="text-2xl font-bold">
        <Link to="/">
          <img src={logo} alt="logo" style={{ width: '200px' }} />
        </Link>
      </div>

      {/* Navigation Links for Large Screens */}
      <div className="hidden md:flex items-center space-x-8">
      <Link to="/" className="hover:text-red-500 transition-colors text-lg">
          Home
        </Link>
        <Link to="/about" className="hover:text-red-500 transition-colors text-lg">
          About
        </Link>
        <Link to="/userProfile" className="hover:text-red-500 transition-colors text-lg">
          <FaUser />
        </Link>
        <Link to="/cart" className="hover:text-red-500 transition-colors relative pr-14">
          <IoCartOutline size={35} />
          10
          {/* CART AMOUNT GOES HERE I THINK */}
        </Link>
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          className="mr-5"
        >
          {isMenuOpen ? <FaTimes size={32} /> : <GiHamburgerMenu size={32} />}
        </button>
      </div>

      {/* Dropdown Menu for Small Screens */}
      <motion.div
        className={`absolute top-full left-0 w-full bg-black flex flex-col items-center py-4 space-y-4 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/">Home</Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/about">About</Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-lg"
          onClick={() => setIsMenuOpen(false)}
        >
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="text-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/userProfile">
            <FaUser />
          </Link>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
          onClick={() => setIsMenuOpen(false)}
        >
          <Link to="/cart">
            <IoCartOutline size={32} />
            {/* {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                {totalItemsInCart}
              </span>
            )} */}
          </Link>
        </motion.div>
      </motion.div>
    </nav>
  );
}

export default Navbar;
