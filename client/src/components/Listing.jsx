import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSquareParking, FaBox } from "react-icons/fa6";
import { MdBedroomChild, MdBathroom } from "react-icons/md";
import { useSelector } from "react-redux";

import "swiper/css";
import ContactToLandlord from "./ContactToLandlord";

const Listing = () => {
	const { currentUser } = useSelector((state) => state.user);
	const { listingId } = useParams();
	const [listingData, setListingData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [showContactBtn, setShowContactBtn] = useState(false);

	useEffect(() => {
		const fetchListingData = async () => {
			try {
				const res = await fetch(`/api/listing/getlisting/${listingId}`);
				if (!res.ok) {
					throw new Error("Failed to fetch listing data");
				}
				const data = await res.json();
				setListingData(data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchListingData();
	}, [listingId]);

	console.log(listingData);

	return (
		<div className="mb-9">
			<div>
				{loading ? (
					<Loader />
				) : error ? (
					<div>Error: {error}</div>
				) : (
					<div className="h-full w-full flex flex-col ">
						<div className="">
							<Swiper
								className="h-[600px] sm:h-[400px]"
								spaceBetween={0}
								slidesPerView={1}
								navigation
								loop={true}
							>
								{listingData.listingData.imageUrls.map(
									(imageUrl, index) => (
										<SwiperSlide key={index}>
											<img
												className="w-full h-full object-cover object-center"
												src={imageUrl}
												alt={`Image ${index}`}
												style={{
													maxHeight: "100%",
													maxWidth: "100%",
												}}
											/>
										</SwiperSlide>
									)
								)}
							</Swiper>
						</div>
						<div className="flex flex-col justify-start items-start mt-10 mx-6 sm:mx-20">
							<h2 className="text-3xl font-bold sm:text-3xl ">
								{listingData.listingData.name}
							</h2>
							<p className="text-[15px] mt-2 flex items-center justify-center gap-2">
								<FaLocationDot className="text-green-800" />
								{listingData.listingData.address}
							</p>
							<div className="mt-5 mx-1 flex gap-5">
								<p>
									{listingData.listingData.sale ? (
										<span className="text-white border-[0.25px] bg-orange-400 px-7 rounded-xl py-2">
											For Sale
										</span>
									) : (
										<span className="text-white border-[0.25px] bg-emerald-400 px-7 rounded-xl py-2">
											For Rent
										</span>
									)}
								</p>
								<p>
									{listingData.listingData.offer ? (
										<span className="text-white border-[0.25px] bg-purple-500 px-7 rounded-xl py-2">{`₹${
											listingData.listingData
												.discountedPrice || 0
										} discount`}</span>
									) : (
										""
									)}
								</p>
							</div>
							<p className="font-bold mx-3 text-xl mt-5">
							₹ {listingData.listingData.regularPrice}
							</p>
							<p className="text-gray-500 mx-3 text-[16px] my-5">
								{listingData.listingData.description}
							</p>
							<div className="flex items-center text-lg mx-3 gap-5 justify-start">
								<p className="flex items-center justify-center gap-1 text-rose-600">
									<MdBedroomChild />
									{`${listingData.listingData.bedrooms} Bedrooms`}
								</p>
								<p className="flex items-center justify-center gap-1 text-cyan-600">
									<MdBathroom />
									{`${listingData.listingData.bathrooms} Bathrooms`}
								</p>
								<p>
									{listingData.listingData.parking ? (
										<FaSquareParking
											size={"22px"}
											className="text-violet-600"
										/>
									) : (
										""
									)}
								</p>
								<p>
									{listingData.listingData.furnished ? (
										<FaBox
											size={"22px"}
											className="text-orange-600"
										/>
									) : (
										""
									)}
								</p>
							</div>
							<div>
								{listingData.listingData.userRef !==
								currentUser.userData.id ? (
									<div className="mt-5 flex items-center justify-center">
										<button
											hidden={showContactBtn}
											onClick={() =>
												setShowContactBtn(true)
											}
											className="w-[385px] sm:w-[500px] bg-red-500 text-white hover:opacity-85 disabled:opacity-45 p-[0.5rem] rounded-lg"
										>
											Contact To Landlord
										</button>
										{showContactBtn && (
											<ContactToLandlord listingData={listingData} />
										)}
									</div>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Listing;
