import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
	signinStart,
	signinSuccess,
	signinFailure,
} from "../redux/user/userSlice.js";

const Signin = () => {
	const errorToaster = (msg) => toast.error(msg);
	const successToaster = (msg) => toast.success(msg);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({ email: "", password: "" });

	const { loading, error } = useSelector((state) => state.user || {});

	const handleChange = (e) => {
		setFormData((prevData) => ({
			...prevData,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(signinStart());

		try {
			const res = await fetch("/api/auth/Signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!data.success) {
				errorToaster(data.message);
				dispatch(signinFailure());
			} else {
				dispatch(signinSuccess(data));
				successToaster(data.message);
				navigate("/");
			}
		} catch (error) {
			console.error("Error occurred:", error);
			errorToaster("An error occurred. Please try again later.");
			dispatch(signinFailure());
		}
	};

	return (
		<div className="max-w-lg p-3 mx-auto">
			{loading && <Loader />}
			<h1 className="text-3xl font-semibold text-center mt-5">Signin</h1>
			<form onSubmit={handleSubmit} className="flex flex-col gap-2 px-2 mt-5">
				<input
					required
					name="email"
					type="email"
					value={formData.email}
					onChange={handleChange}
					className="px-5 py-3 border-[0.5px] rounded-md "
					placeholder="Email..."
				/>
				<input
					required
					name="password"
					type="password"
					value={formData.password}
					onChange={handleChange}
					className="px-5 py-3 border-[0.5px] rounded-md "
					placeholder="Password..."
				/>

				<button
					disabled={loading}
					className="bg-red-500 text-white hover:opacity-85 disabled:opacity-45 p-3 rounded-lg"
				>
					Sign In
				</button>
			</form>
			<p className="mt-5">
				Don't have an Account?{" "}
				<span className="text-blue-700">
					<Link to={"/signup"}>Signup</Link>
				</span>
			</p>
			<Toaster />
		</div>
	);
};

export default Signin;
