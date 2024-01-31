import React from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="px-1 sm:px-10 ">
      <div className="flex items-center justify-between p-3 px-5 sm:px-10  border-b-[0.5px] border-gray-200">
        <h1 className="text-2xl py-1 px-4 rounded-lg bg-red-500 text-white">
          Estate
        </h1>

        <form className="w-[150px] sm:w-[300px] bg-slate-100 rounded-lg flex px-2 py-2 items-center justify-between">
          <input
            type="text"
            className="bg-transparent focus:outline-none"
            placeholder="Search..."
          />
          <CiSearch />
        </form>

        <ul className="flex items-center justify-between gap-10 cursor-pointer">
          <Link to={"/"}>
            <li className="cursor-pointer text-slate-700 hover:underline hover:text-red-500 hidden sm:inline">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            <li className="cursor-pointer text-slate-700 hover:underline hover:text-red-500 hidden sm:inline">
              About
            </li>
          </Link>
          <Link to={"/signin"}>
            <li className="cursor-pointer bg-black text-white px-3 py-2 rounded-md hover:bg-transparent border-[0.5px] border-transparent hover:text-black hover:border-black hover:border-[0.5px] ease-in-out duration-500">
              Signin
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
``;
export default Navbar;
Navbar;
