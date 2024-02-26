import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // For animations
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Loader from "../components/Loader.jsx";

const HomePage = () => {
	const navigate = useNavigate();
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const res = await fetch("/api/listing/search");

				if (!res.ok) {
					throw new Error("Failed to fetch listings");
				}
				const data = await res.json();
				setListings(data);
			} catch (error) {
				console.error(error);
				toast.error("Failed to fetch listings");
			} finally {
				setLoading(false);
			}
		};

		fetchListings();
	}, []);

	const handlePropertyClick = (listingId) => {
		navigate(`/listing/${listingId}`);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div>
			<div className="bg-cover bg-center bg-gradient-to-b from-gray-900 to-gray-700 relative">
				<div className="container mx-auto py-20 flex flex-col items-center justify-center text-center relative">
					<motion.h1
						className="text-4xl lg:text-6xl font-bold text-white mb-6"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.5 }}
					>
						Find Your Dream Home
					</motion.h1>
					<div className="max-w-lg mx-auto flex items-center">
						<input
							type="text"
							placeholder="Search for listings..."
							className="flex-1 sm:w-[500px] px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring focus:border-blue-300"
						/>
						<motion.button
						className="rounded-lg ml-3 px-6 py-[0.6rem] border-2 border-red-600 text-white hover:bg-red-600 hover:text-red-100 duration-300"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6, duration: 0.5 }}
					>
						Search
					</motion.button>
					</div>
					<motion.p
						className="text-lg lg:text-xl text-white mb-8 max-w-lg mt-5"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.5 }}
					>
						Explore top listings and discover your <br />
						perfect listing
					</motion.p>
					
				</div>
			</div>

			<div className="container mx-auto my-8 px-4 sm:px-20">
				<h2 className="text-3xl font-bold mb-4">Top Listings</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-14">
					{listings.map((listing) => (
						<motion.div
							key={listing._id}
							className="listing rounded-lg overflow-hidden shadow-md bg-white"
							whileHover={{ scale: 1.05 }}
							onClick={() => handlePropertyClick(listing._id)}
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
						>
							{/* Assuming `imageUrls` is an array and taking the first image */}
							<img
								src={listing.imageUrls[0]}
								alt={listing.name}
								className="w-full h-60 object-cover"
							/>
							<div className="p-4">
								<h3 className="text-xl font-semibold mb-2">
									{listing.name}
								</h3>
								<p className="text-gray-600 mb-2">
									{listing.description}
								</p>
								<p className="text-lg font-bold">
                ₹ {listing.regularPrice}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</div>

			<Toaster />
		</div>
	);
};

export default HomePage;
