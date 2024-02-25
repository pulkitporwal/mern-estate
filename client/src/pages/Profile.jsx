import React, { useEffect, useState } from "react";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytes,
	uploadBytesResumable,
} from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import { app } from "../../firebase";
import {
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
	signoutUserStart,
	signinSuccess,
	signoutUserFailure,
} from "../redux/user/userSlice";
import Loader from "../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
	const { currentUser } = useSelector((state) => state.user);
	const [formData, setFormData] = useState({});
	const fileRef = useRef();
	const [file, setFile] = useState(undefined);
	const [fileProgress, setFileProgress] = useState(0);
	const [FileUploadError, setFileUploadError] = useState(false);
	const { loading, error } = useSelector((state) => state.user || {});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const errorToaster = (msg) => toast.error(msg);
	const successToaster = (msg) => toast.success(msg);
	const [fileProgressMessage, setFileProgressMessage] = useState("");

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
				// console.log(`Upload File ${progress}% done`);
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

	useEffect(() => {
		if (fileProgress > 0 && fileProgress < 100) {
			setFileProgressMessage(`Uploading... ${fileProgress}%`);
		}
		if (fileProgress === 100) {
			setTimeout(() => {
				setFileProgressMessage("Image Uploaded Successfully!!");
			}, 4000);
		}
	}, [fileProgress]);

	function handleChange(e) {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			dispatch(updateUserStart());
			const res = await fetch(
				`/api/user/update/${currentUser.userData._id}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formData),
				}
			);
			const data = await res.json();

			if (data?.success || data?.currentUser.success) {
				dispatch(updateUserSuccess(data));
				successToaster(data.message);
			}
		} catch (error) {
			dispatch(updateUserFailure(error));
		}
	}

	async function handleDeleteUser() {
		const areYouSure = confirm("Are you Sure to Delete your Account");

		if (areYouSure) {
			dispatch(deleteUserStart());

			const res = await fetch(
				`/api/user/delete/${currentUser.userData._id}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();

			if (data.success === false) {
				dispatch(deleteUserFailure(data.message));
				return;
			}
			dispatch(deleteUserSuccess(data));
			successToaster("Account Deleted Successfully");
			setTimeout(() => {
				navigate("/");
			}, 1000);
		}
	}

	async function handleSignout() {
		dispatch(signoutUserStart());
		const res = await fetch("/api/auth/signout");
		const data = await res.json();
		if (data.success === false) {
			dispatch(signoutUserFailure(data.message));
			errorToaster(data.message);
		} else {
			dispatch(signinSuccess());
			successToaster("User Signed Out Successfully");
			setTimeout(() => {
				navigate("/signin");
			}, 1000);
		}
	}

	return (
		<div className="p-3 max-w-lg mx-auto">
			{loading ? <Loader /> : ""}
			<h1 className="text-3xl font-semibold text-center mb-5">Profile</h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center gap-4"
			>
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
						formData.avatar ||
						(currentUser.userData && currentUser.userData.avatar) ||
						(currentUser.restUpdatedUser &&
							currentUser.restUpdatedUser.avatar)
					}
					alt={
						formData.username ||
						(currentUser.userData &&
							currentUser.userData.username) ||
						(currentUser.restUpdatedUser &&
							currentUser.restUpdatedUser.username)
					}
				/>

				{FileUploadError ? (
					<span className="text-red-700 text-center font-bold">
						Error in Image Upload
					</span>
				) : fileProgress > 0 && fileProgress < 100 ? (
					<span className="font-bold text-green-700">
						{fileProgressMessage}
					</span>
				) : fileProgress == 100 ? (
					<span className="text-green-700 font-bold">
						{fileProgressMessage}
					</span>
				) : (
					""
				)}
				<input
					name="username"
					type="text"
					onChange={handleChange}
					defaultValue={
						formData.username ||
						(currentUser.userData &&
							currentUser.userData.username) ||
						(currentUser.restUpdatedUser &&
							currentUser.restUpdatedUser.username)
					}
					id="username"
					className="px-5 w-[350px] sm:w-[400px] py-2 border-[0.5px] rounded-md "
					placeholder="Username..."
				/>
				<input
					name="email"
					type="email"
					defaultValue={
						formData.email ||
						(currentUser.userData && currentUser.userData.email) ||
						(currentUser.restUpdatedUser &&
							currentUser.restUpdatedUser.email)
					}
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
				<div className="w-full flex gap-4 px-5 sm:px-[2.6rem]">

				<Link className="w-[600px] flex-1 text-center bg-yellow-500 text-white hover:opacity-85 disabled:opacity-45 p-[0.5rem] rounded-lg" to={"/create-listing"}>
				Create a Listing
				</Link>
				<Link className="w-[600px] flex-1 text-center bg-blue-500 text-white hover:opacity-85 disabled:opacity-45 p-[0.5rem] rounded-lg" to={"/my-listings"}>
				My Listings
				</Link>
				</div>
			</form>
			
			<div className="flex justify-between mx-8 sm:mx-12 my-5">
				<span
					onClick={handleDeleteUser}
					className="text-red-700 cursor-pointer"
				>
					Delete account
				</span>
				<span
					onClick={handleSignout}
					className="text-red-700 cursor-pointer"
				>
					Sign out
				</span>
			</div>
			<Toaster />
		</div>
	);
};

export default Profile;
