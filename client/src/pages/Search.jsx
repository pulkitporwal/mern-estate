import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";

const Search = () => {
	const location = useLocation();
	const navigate = useNavigate(); // Use useNavigate instead of useHistory
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [furnished, setFurnished] = useState(false);
	const [parking, setParking] = useState(false);
	const [offerTypes, setOfferTypes] = useState({
		sell: false,
		sellAndRent: false,
		rent: false,
	});
	const [sortBy, setSortBy] = useState("createdAt");
	const [sortOrder, setSortOrder] = useState("desc");

	useEffect(() => {
		const fetchSearchResults = async () => {
			try {
				const res = await fetch(
					`/api/listing/search${location.search}`
				);
				if (!res.ok) {
					throw new Error("Failed to fetch search results");
				}
				const data = await res.json();
				setListings(data);
			} catch (error) {
				console.error(error);
				// Handle error (e.g., show error message)
			} finally {
				setLoading(false); // Set loading to false after fetching data
			}
		};

		fetchSearchResults();
	}, [location.search]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		const queryParams = new URLSearchParams();
		queryParams.set("searchTerm", searchTerm);
		queryParams.set("furnished", furnished);
		queryParams.set("parking", parking);
		queryParams.set("sell", offerTypes.sell);
		queryParams.set("sellAndRent", offerTypes.sellAndRent);
		queryParams.set("rent", offerTypes.rent);
		queryParams.set("sortBy", sortBy);
		queryParams.set("sortOrder", sortOrder);
		// Update browser URL with new query parameters
		navigate(`/search?${queryParams.toString()}`); // Use navigate instead of history.push
	};
	const openListing = (listingId) => {
		navigate(`/listing/${listingId}`);
	};

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8">Search Listings</h1>

			<form onSubmit={handleSearchSubmit} className="mb-8">
				<div className="flex flex-wrap mb-4">
					<input
						type="text"
						placeholder="Search Term"
						className="border rounded px-4 py-2 mb-2 mr-2"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<label className="flex items-center mb-2 mr-4">
						<input
							type="checkbox"
							className="mr-2"
							checked={furnished}
							onChange={(e) => setFurnished(e.target.checked)}
						/>
						Furnished
					</label>
					<label className="flex items-center mb-2 mr-4">
						<input
							type="checkbox"
							className="mr-2"
							checked={parking}
							onChange={(e) => setParking(e.target.checked)}
						/>
						Parking
					</label>
					<label className="flex items-center mb-2 mr-4">
						<input
							type="checkbox"
							className="mr-2"
							checked={offerTypes.sell}
							onChange={(e) =>
								setOfferTypes({
									...offerTypes,
									sell: e.target.checked,
								})
							}
						/>
						Sell
					</label>
					<label className="flex items-center mb-2 mr-4">
						<input
							type="checkbox"
							className="mr-2"
							checked={offerTypes.sellAndRent}
							onChange={(e) =>
								setOfferTypes({
									...offerTypes,
									sellAndRent: e.target.checked,
								})
							}
						/>
						Sell & Rent
					</label>
					<label className="flex items-center mb-2">
						<input
							type="checkbox"
							className="mr-2"
							checked={offerTypes.rent}
							onChange={(e) =>
								setOfferTypes({
									...offerTypes,
									rent: e.target.checked,
								})
							}
						/>
						Rent
					</label>
				</div>
				<div className="flex items-center mb-4">
					<label className="block mr-4">
						Sort By:
						<select
							className="border rounded px-4 py-2 ml-2"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
						>
							<option value="createdAt">Date Created</option>
							<option value="price">Price</option>
							{/* Add more options for sorting */}
						</select>
					</label>
					<label className="block">
						Sort Order:
						<select
							className="border rounded px-4 py-2 ml-2"
							value={sortOrder}
							onChange={(e) => setSortOrder(e.target.value)}
						>
							<option value="desc">Descending</option>
							<option value="asc">Ascending</option>
						</select>
					</label>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
				>
					Search
				</button>
			</form>

			{listings.length === 0 ? (
				<p className="text-xl">
					No listings found matching your search criteria.
				</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					{listings.map((listing) => (
						<div
							onClick={() => openListing(listing._id)}
							key={listing._id}
							className="bg-white rounded-lg shadow-md hover:scale-105 transition-all"
						>
							<img
								src={listing.imageUrls[0]}
								alt={listing.name}
								className="w-full h-48 object-cover rounded-t-lg"
							/>
							<div className="p-4">
								<h2 className="text-xl font-semibold mb-2">
									{listing.name}
								</h2>
								<p className="text-gray-600 mb-2">
									{listing.description}
								</p>
								<p className="text-lg font-bold">
									₹{listing.regularPrice}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Search;
