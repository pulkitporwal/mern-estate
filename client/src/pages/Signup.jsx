import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

const Signup = () => {
	const errorToaster = (msg) => toast.error(msg);
	const successToaster = (msg) => toast.success(msg);

	const navigate = useNavigate();

	const [formData, setFormData] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	function handleChange(e) {
		setFormData({ ...formData, [e.target.id]: e.target.value });
	}

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);

		const res = await fetch("/api/auth/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		const data = await res.json();

		if (!data.success) {
			errorToaster(data.message);
		}
		setIsLoading(false);
		if (data.success) {
			successToaster(data.message);
			setTimeout(() => {
				navigate("/signin");
			}, 1000);
		}
	}

	return (
		<div className="max-w-lg p-3 mx-auto">
			{isLoading ? <Loader /> : ""}
			<h1 className="text-3xl font-semibold text-center mt-5">SignUp</h1>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-2 px-2 mt-5"
			>
				<input
					required
					name="username"
					type="text"
					onChange={handleChange}
					id="username"
					className="px-5 py-3 border-[0.5px] rounded-md "
					placeholder="Username..."
				/>
				<input
					required
					name="email"
					type="email"
					onChange={handleChange}
					id="email"
					className="px-5 py-3 border-[0.5px] rounded-md "
					placeholder="Email..."
				/>
				<input
					required
					name="password"
					type="password"
					onChange={handleChange}
					id="password"
					className="px-5 py-3 border-[0.5px] rounded-md "
					placeholder="Password..."
				/>

				<button
					disabled={isLoading}
					className="bg-red-500 text-white hover:opacity-85 disabled:opacity-45 p-3 rounded-lg"
				>
					Sign Up
				</button>
			</form>
			<p className="mt-5">
				Have an Account?{" "}
				<span className="text-blue-700">
					<Link to={"/signin"}>Signin</Link>
				</span>
			</p>
			<Toaster />
		</div>
	);
};

export default Signup;
