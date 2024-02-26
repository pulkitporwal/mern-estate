import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
	const [searchTerm, setsearchTerm] = useState("");
	const navigate = useNavigate();

	const userInfo = useSelector((state) => state.user) || null;

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("searchTerm", searchTerm);
		const searchQuery = urlParams.toString();

		navigate(`/search?${searchQuery}`);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const searchTermFromURL = urlParams.get("searchTerm");
		if (searchTermFromURL) {
			setsearchTerm(searchTermFromURL);
		}
	}, [location.search]);

	return (
		<div className="px-1 sm:px-10 bg-red-100">
			<div className="flex items-center justify-between p-3 px-5 sm:px-10  border-b-[2px] border-gray-200">
				<Link to={"/"}>
					<h1 className="text-2xl py-1 px-4 rounded-lg bg-red-500 text-white">
						Estate
					</h1>
				</Link>

				{/* <form
					onSubmit={handleSearchSubmit}
					className="sm:w-[300px] bg-slate-100 rounded-lg flex sm:ml-20 ml-0 px-2 py-2 items-center justify-between"
				>
					<input
						type="text"
						className="w-[100px] bg-transparent focus:outline-none"
						placeholder="Search..."
						value={searchTerm}
						onChange={(e) => setsearchTerm(e.target.value)}
					/>
					<button>
						<CiSearch />
					</button>
				</form> */}

				<ul className="flex items-center justify-between gap-10 cursor-pointer">
					<li className="cursor-pointer text-slate-700 hover:underline hover:text-red-500 hidden sm:inline">
						<Link to={"/"}>Home</Link>
					</li>
					<li className="cursor-pointer text-slate-700 hover:underline hover:text-red-500 hidden sm:inline">
						<Link to={"/about"}>About</Link>
					</li>

					<Link to={"/profile"}>
						<li className="cursor-pointer">
							{userInfo.currentUser == null ? (
								<span className="bg-black text-white px-3 py-2 rounded-md hover:bg-transparent border-[0.5px] border-transparent hover:text-black hover:border-black hover:border-[0.5px] ease-in-out duration-500">
									Signin
								</span>
							) : (
								<img
									className="h-8 w-8 object-cover object-center rounded-full"
									src={userInfo.currentUser.userData?.avatar}
									alt="profile"
								/>
							)}
						</li>
					</Link>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;
