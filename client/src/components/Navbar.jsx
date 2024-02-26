import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userInfo = useSelector((state) => state.user) || null;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-1 sm:px-10 bg-red-100"
    >
      <div className="flex justify-between items-center p-3">
        <Link to={"/"} className="flex items-center gap-4">
          <h1 className="text-2xl rounded-lg bg-red-500 text-white px-4 py-1 cursor-pointer">
            Estate
          </h1>
        </Link>
        <div className="hidden sm:flex items-center gap-4">
          <ul className="flex items-center justify-between gap-10 cursor-pointer">
            <motion.li
              whileHover={{ scale: 1.1, color: "#ff5722" }}
              className="cursor-pointer text-slate-700 hover:underline"
            >
              <Link to={"/"}>Home</Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1, color: "#ff5722" }}
              className="cursor-pointer text-slate-700 hover:underline"
            >
              <Link to={"/about"}>About</Link>
            </motion.li>
          </ul>
        </div>
        <div className="sm:hidden">
          <button
            className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        {userInfo && (
          <div className="hidden sm:flex items-center gap-2">
            <Link to={"/profile"}>
              <img
                className="h-8 w-8 object-cover object-center rounded-full"
                src={userInfo.currentUser.userData?.avatar}
                alt="profile"
              />
            </Link>
          </div>
        )}
      </div>
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            <li className="text-slate-700 hover:underline">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="text-slate-700 hover:underline">
              <Link to={"/about"}>About</Link>
            </li>
            {userInfo && (
              <li className="text-slate-700 hover:underline">
                <Link to={"/profile"}>Profile</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default Navbar;
