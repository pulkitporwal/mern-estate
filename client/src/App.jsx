import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import MyListings from "./pages/MyListings.jsx";
import EditListing from "./pages/EditListing.jsx";
import Listing from "./components/Listing.jsx";
import Search from "./pages/Search.jsx";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path={"/"} element={<Home />} />
				<Route path={"/Signin"} element={<Signin />} />
				<Route path={"/signup"} element={<Signup />} />
				<Route path={"/about"} element={<About />} />
				<Route path={"/listing/:listingId"} element={<Listing />} />
				<Route path={"/search"} element={<Search />} />

				<Route element={<PrivateRoute />}>
					<Route path={"/profile"} element={<Profile />} />
					<Route
						path={"/create-listing"}
						element={<CreateListing />}
					/>
					<Route path={"/my-listings"} element={<MyListings />} />

					<Route
						path={"/edit-listing/:listingId"}
						element={<EditListing />}
					/>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
