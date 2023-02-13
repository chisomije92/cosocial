/** @format */

import React from "react";
import NavBar from "../../components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<>
			<NavBar />
			<main className="flex w-full">
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
