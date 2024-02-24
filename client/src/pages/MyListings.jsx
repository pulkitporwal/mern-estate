import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Listing from "../components/Listing";
import { FaSquareParking } from "react-icons/fa6";
import { MdOutlineBedroomParent, MdSell } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const MyListings = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [myListingData, setMyListingData] = useState([]);

	useEffect(() => {
		const fetchListings = async () => {
			const res = await fetch(
				`/api/user/mylistings/${currentUser.userData._id}`
			);
			const data = await res.json();
			setMyListingData(data.listingsArray);
		};
		fetchListings();
	}, [currentUser]);
    const navigate = useNavigate()

	console.log(myListingData);

    const openListing = (key)=>{
        navigate(`/my-listings/${key}`)
    }

	return (
		<div>
			<div className="text-center p-10">
				<h1 className="font-bold text-4xl mb-4">My Listings</h1>
				<section
					className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
				>
					{myListingData.map((listing) => (
						<div onClick={()=>openListing(listing._id)}
							key={listing._id}
							className="w-72 cursor-pointer bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
						>
							<img
								src={listing.imageUrls[0]}
								alt="Product"
								className="object-cover w-full object-center rounded-t-xl h-44"
							/>
							<div className="px-4 py-3 w-72">
								<p className="text-lg font-bold text-black truncate block capitalize">
									{listing.name}
								</p>
								<div className="text-gray-400 mr-3 h-24 text-center py-3 uppercase text-xs">
									{listing.description}
								</div>
								<div className="flex items-center justify-between">
									<p className="text-lg font-semibold text-black cursor-auto my-3">
										₹ {listing.regularPrice}
									</p>
									<p className="text-sm text-red-600 cursor-auto ml-2">
										{listing.discountedPrice
											? `- ₹${listing.discountedPrice}`
											: ""}
									</p>

									<div className="ml-10 flex items-center justify-end gap-3 ">
										{listing.parking ? (
											<FaSquareParking size={"25px"} />
										) : (
											""
										)}
										{listing.rent ? (
											<MdOutlineBedroomParent
												size={"25px"}
											/>
										) : (
											<MdSell size={"25px"} />
										)}
										{listing.offer ? (
											<BiSolidOffer size={"25px"} />
										) : (
											""
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				</section>
			</div>
		</div>
	);
};

export default MyListings;
