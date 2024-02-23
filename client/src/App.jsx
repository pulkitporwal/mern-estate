import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import About from "./pages/About.jsx";
import Profile from "./pages/Profile.jsx";
import Navbar from "./components/Navbar.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path={"/"} element={<Home />} />
				<Route path={"/Signin"} element={<Signin />} />
				<Route path={"/signup"} element={<Signup />} />
				<Route path={"/about"} element={<About />} />

				<Route element={<PrivateRoute />}>
					<Route path={"/profile"} element={<Profile />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
