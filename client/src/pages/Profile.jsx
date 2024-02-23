import React, { useEffect, useState } from "react";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
	uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../../firebase";

const Profile = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [formData, setFormData] = useState({});
	const fileRef = useRef();
	const [file, setFile] = useState(undefined);
	const [fileProgress, setFileProgress] = useState(0);
	const [FileUploadError, setFileUploadError] = useState(false);

	function handleFileChange(file) {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setFileProgress(Math.round(progress));
				console.log(`Upload File ${progress}% done`);
			},
			(error) => {
				setFileUploadError(true);
				console.error("Error uploading file:", error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((downloadUrl) => {
						setFormData({ ...formData, avatar: downloadUrl });
					})
					.catch((error) => {
						console.error("Error getting download URL:", error);
					});
			}
		);
	}

	useEffect(() => {
		if (file) {
			handleFileChange(file);
		}
	}, [file]);

	function handleChange(e) {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	}

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl font-semibold text-center mb-5">Profile</h1>
			<form className="flex flex-col items-center gap-4">
				<input
					onChange={(e) => setFile(e.target.files[0])}
					ref={fileRef}
					type="file"
					name="avatar"
					id="profile-image"
					hidden
					accept="image/*"
				/>
				<img
					onClick={() => fileRef.current.click()}
					className="w-[150px] h-[150px] object-cover object-center border[0.5px] p-3 rounded-full"
					src={
						formData.avatar
							? formData.avatar
							: currentUser.userData.avatar
					}
					alt={currentUser.userData.username}
				/>
				{FileUploadError ? (
					<span className="text-red-700 text-center font-bold">
						Error in Image Upload
					</span>
				) : fileProgress > 0 && fileProgress < 100 ? (
					<span className="font-bold">Uploading... {fileProgress}%</span>
				) : fileProgress == 100 ? (
					<span className="text-green-700 font-bold">Image Uploaded Successfully!!</span>
				) : (
					""
				)}
				<input
					name="username"
					type="text"
					onChange={handleChange}
					id="username"
					className="px-5 w-[350px] sm:w-[400px] py-2 border-[0.5px] rounded-md "
					placeholder="Username..."
				/>
				<input
					name="email"
					type="email"
					onChange={handleChange}
					id="email"
					className="px-5 w-[350px] sm:w-[400px] py-2 border-[0.5px] rounded-md "
					placeholder="Email..."
				/>
				<input
					name="password"
					type="password"
					onChange={handleChange}
					id="password"
					className="px-5 w-[350px] sm:w-[400px] py-2 border-[0.5px] rounded-md "
					placeholder="Password..."
				/>
				<button className="w-[350px] sm:w-[400px] bg-red-500 text-white hover:opacity-85 disabled:opacity-45 p-[0.5rem] rounded-lg">
					Update
				</button>
			</form>
			<div className="flex justify-between mx-8 sm:mx-12 my-5">
				<span
					// onClick={handleDeleteUser}
					className="text-red-700 cursor-pointer"
				>
					Delete account
				</span>
				<span
					// onClick={handleSignOut}
					className="text-red-700 cursor-pointer"
				>
					Sign out
				</span>
			</div>
		</div>
	);
};

export default Profile;
