import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
	deleteObject,
  list, // Add this import for removing images
} from "firebase/storage";
import { app } from "../../firebase.js";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster
import Loader from "../components/Loader.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function CreateListing() {
	const { currentUser } = useSelector((state) => state.user);
	const { listingId } = useParams();
	const navigate = useNavigate();
	const [ImageFiles, setImageFiles] = useState([]);
	const [formData, setFormData] = useState({});

	const [uploadingProgress, setUploadingProgress] = useState(0);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`/api/listing/getListing/${listingId}`);
				const data = await res.json();
				setFormData(data.listingData);
			} catch (error) {
				console.error("Error fetching listing data:", error);
				toast.error("Error fetching listing data");
			}
		};

		fetchData();
	}, [listingId]);

	const handleInputChanges = (e) => {
		if (e.target.id === "sale" || e.target.id === "rent") {
			setFormData({
				...formData,
				type: e.target.id,
			});
		}

		if (
			e.target.id === "parking" ||
			e.target.id === "furnished" ||
			e.target.id === "offer"
		) {
			setFormData({
				...formData,
				[e.target.id]: e.target.checked,
			});
		}

		if (
			e.target.type === "number" ||
			e.target.type === "text" ||
			e.target.type === "textarea"
		) {
			setFormData({
				...formData,
				[e.target.id]: e.target.value,
			});
		}
	};

	const handleImageUpload = () => {
		if (ImageFiles.length > 0 && ImageFiles.length < 7) {
			const promiseArray = [];

			for (let i = 0; i < ImageFiles.length; i++) {
				promiseArray.push(storeImage(ImageFiles[i]));
			}

			Promise.all(promiseArray)
				.then((urls) => {
					setFormData({
						...formData,
						imageUrls: [...formData.imageUrls, ...urls],
					});
					toast.success("Images uploaded successfully");
				})
				.catch((error) => {
					toast.error(`Error uploading images: ${error}`);
				});
		} else {
			toast.error("You can upload only 6 images");
		}
	};

	const storeImage = async (file) => {
		return new Promise((resolve, reject) => {
			const storage = getStorage(app);
			const fileName = new Date().getTime() + file.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					setUploadingProgress(progress);
				},
				(error) => {
					reject(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							resolve(downloadURL);
						}
					);
				}
			);
		});
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();

		try {
			setLoading(true);

			setError(false);

			const res = await fetch(`/api/listing/update/${listingId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...formData,
				}),
			});

			const data = await res.json();

			if (data.success == false) {
				setError(data.message);
				toast.error(data.message);
				setLoading(false);
			}

			if (data.success == true) {
				setLoading(false);
				toast.success("Your Property has been successfully listed");
				navigate("/my-listings");
			}
		} catch (error) {
			setError(error.message);
			setLoading(false);
			toast.error("Error submitting form");
		}
	};

	const removeImage = (index) => {
		const imageUrlToRemove = formData.imageUrls[index];
		const newImageUrls = formData.imageUrls.filter((_, i) => i !== index);
		setFormData({ ...formData, imageUrls: newImageUrls });

		const storage = getStorage(app);
		const imageRef = ref(storage, imageUrlToRemove);

		deleteObject(imageRef)
			.then(() => {
				toast.success("Image removed successfully!");
			})
			.catch((error) => {
				console.error("Error removing image:", error);
				toast.error("Error removing image");
			});
	};

	return (

		<main className="p-3 max-w-4xl mx-auto">
			{loading ? <Loader /> : ""}
			<h1 className="text-3xl font-semibold text-center my-2">
				Edit a Listing
			</h1>
			<form onSubmit={handleFormSubmit} className="flex flex-col gap-4 ">
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
							onChange={handleInputChanges}
							value={formData.name || ""}
						/>
						<textarea
							type="text"
							placeholder="Description"
							className="border p-3 rounded-lg"
							id="description"
							required
							onChange={handleInputChanges}
							value={formData.description || ""}
						/>
						<input
							type="text"
							placeholder="Address"
							className="border p-3 rounded-lg"
							id="address"
							required
							onChange={handleInputChanges}
							value={formData.address || ""}
						/>
						<div className="flex gap-6 flex-wrap">
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="sale"
									className="w-5"
									onChange={handleInputChanges}
									checked={formData.type === "sale"}
								/>
								<span>Sell</span>
							</div>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="rent"
									className="w-5"
									onChange={handleInputChanges}
									checked={formData.type === "rent"}
								/>
								<span>Rent</span>
							</div>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="parking"
									className="w-5"
									onChange={handleInputChanges}
									checked={formData.parking}
								/>
								<span>Parking spot</span>
							</div>
							<div className="flex gap-2">
								<input
									type="checkbox"
									id="furnished"
									className="w-5"
									onChange={handleInputChanges}
									checked={formData.furnished}
								/>
								<span>Furnished</span>
							</div>

							<div className="flex gap-2">
								<input
									type="checkbox"
									id="offer"
									className="w-5"
									onChange={handleInputChanges}
									checked={formData.offer}
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
									onChange={handleInputChanges}
									value={formData.bedrooms}
								/>
								<p>Bedrooms</p>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="bathrooms"
									min="1"
									max="10"
									required
									className="p-3 border border-gray-300 rounded-lg"
									onChange={handleInputChanges}
									value={formData.bathrooms}
								/>
								<p>Bathrooms</p>
							</div>
							<div className="flex items-center gap-2">
								<input
									type="number"
									id="regularPrice"
									min="50"
									max="10000000"
									required
									className="p-3 border border-gray-300 rounded-lg"
									onChange={handleInputChanges}
									value={formData.regularPrice}
								/>
								<div className="flex flex-col items-center">
									<p>Regular price</p>

									<span className="text-xs">($ / month)</span>
								</div>
							</div>

							{formData.offer ? (
								<div>
									<div className="flex items-center gap-2">
										<input
											type="number"
											id="discountPrice"
											min="0"
											max="10000000"
											required
											className="p-3 border border-gray-300 rounded-lg"
											onChange={handleInputChanges}
											value={formData.discountPrice}
										/>
										<div className="flex flex-col items-center">
											<p>Discounted price</p>
											<span className="text-xs">
												($ / month)
											</span>
										</div>
									</div>
								</div>
							) : (
								""
							)}
						</div>
					</div>
					<div>
						<div className="flex flex-1 flex-col mt-9 sm:mt-6">
							<p className="font-bold">
								Images:{" "}
								<span className="font-normal text-gray-600">
									First Image will be the Cover Image (Max
									Image Allowed: 6)
								</span>
							</p>
							<div className="flex gap-2">
								<input
									onChange={(e) =>
										setImageFiles(e.target.files)
									}
									className="flex-[3] p-3 w-full border-[0.5px] mt-5 border-yellow-500 rounded "
									type="file"
									id="images"
									accept="images/*"
									multiple
								/>

								<div
									type="button"
									onClick={handleImageUpload}
									className="w-[350px] sm:w-[400px] flex items-center justify-center text-center bg-yellow-500 flex-[1] text-black hover:opacity-85 disabled:opacity-45 p-[0.5rem] rounded-lg mt-5"
								>
									{uploadingProgress > 0 &&
									uploadingProgress < 100
										? "Uploading..."
										: uploadingProgress == 100
										? "Uploaded"
										: "Upload"}
								</div>
							</div>
						</div>
						<div>
							<div className="flex flex-wrap gap-3 mt-3">
								{formData?.imageUrls?.length > 0 &&
									formData?.imageUrls.map((url, index) => (
										<div key={index} className="relative">
											<img
												src={url}
												className="w-[60px] object-contain p-2 border-[0.5px] border-red-500 rounded-sm"
												alt={`img ${index}`}
											/>
											<button
												onClick={() =>
													removeImage(index)
												}
												className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center focus:outline-none transform translate-x-1/2 -translate-y-1/2 -translate-x-full"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-3 w-3"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
											</button>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
				<button
					type="submit"
					className="w-full bg-red-500 text-white hover:opacity-85 disabled:opacity-45 p-[0.5rem] rounded-lg"
				>
					Update the Listing
				</button>
			</form>
			<Toaster />
		</main>
	);
}
