export default function CreateListing() {
	return (
		<main className="p-3 max-w-4xl mx-auto">
			<h1 className="text-3xl font-semibold text-center my-2">
				Create a Listing
			</h1>
			<form className="flex flex-col gap-4 ">
				<div>
					<div className="flex flex-col gap-4 flex-1">
						<input
							type="text"
							placeholder="Name"
							className="border p-3 rounded-lg"
							id="name"
							maxLength="62"
							minLength="10"
							required
						/>
						<textarea
							type="text"
							placeholder="Description"
							className="border p-3 rounded-lg"
							id="description"
							required
						/>
						<input
							type="text"
							placeholder="Address"
							className="border p-3 rounded-lg"
							id="address"
							required
						/>
						<div className="flex gap-6 flex-wrap">
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="sale"
									className="w-5"
								/>
								<span>Sell</span>
							</div>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="rent"
									className="w-5"
								/>
								<span>Rent</span>
							</div>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="parking"
									className="w-5"
								/>
								<span>Parking spot</span>
							</div>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="furnished"
									className="w-5"
								/>
								<span>Furnished</span>
							</div>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="offer"
									className="w-5"
								/>
								<span>Offer</span>
							</div>
						</div>
						<div className="flex flex-wrap gap-6">
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="bedrooms"
									min="1"
									max="10"
									required
									className="p-3 border border-gray-300 rounded-lg"
								/>
								<p>Beds</p>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="bathrooms"
									min="1"
									max="10"
									required
									className="p-3 border border-gray-300 rounded-lg"
								/>
								<p>Baths</p>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="regularPrice"
									min="50"
									max="10000000"
									required
									className="p-3 border border-gray-300 rounded-lg"
								/>
								<div className="flex flex-col items-center">
									<p>Regular price</p>

									<span className="text-xs">($ / month)</span>
								</div>
							</div>

							<div className="flex items-center gap-2">
								<input
									type="number"
									id="discountPrice"
									min="0"
									max="10000000"
									required
									className="p-3 border border-gray-300 rounded-lg"
								/>
								<div className="flex flex-col items-center">
									<p>Discounted price</p>

									<span className="text-xs">($ / month)</span>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-1 flex-col mt-9 sm:mt-6">
						<p className="font-bold">
							Images:{" "}
							<span className="font-normal text-gray-600">
								First Image will be the Cover Image (Max Image
								Allowed: 6)
							</span>
						</p>
						<div className="flex gap-2">
							<input
								className="flex-[3] p-3 w-full border-[0.5px] mt-5 border-yellow-500 rounded "
								type="file"
								id="images"
								accept="images/*"
								multiple
							/>
							<button className="w-[350px] sm:w-[400px] text-center bg-yellow-500 flex-[1] text-black hover:opacity-85 disabled:opacity-45 p-[0.5rem] rounded-lg mt-5">
								Upload
							</button>
						</div>
					</div>
				</div>
        <button type='submit' className="w-full bg-red-500 text-white hover:opacity-85 disabled:opacity-45 p-[0.5rem] rounded-lg">Create a Listing</button>
			</form>
		</main>
	);
}
