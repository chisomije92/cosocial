/** @format */

import React, { FC } from "react";
import NavBar from "../../components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout: FC<{ isSignedIn?: boolean; onSignOut: () => void }> = ({
	isSignedIn,
	onSignOut,
}) => {
	return (
		<>
			<NavBar onSignOut={onSignOut} />
			<main className="flex w-12">
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
