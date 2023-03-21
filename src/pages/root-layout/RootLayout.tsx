/** @format */

import React, { useEffect } from "react";
import NavBar from "../../components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";

const RootLayout = () => {
	const { autoLogout, authUser } = useAuth();
	let dataExpirationTimer = authUser && authUser.expirationTimer;

	useEffect(() => {
		if (dataExpirationTimer) {
			autoLogout(
				new Date(dataExpirationTimer).getTime() - new Date().getTime()
			);
		}
	}, [dataExpirationTimer]);

	return (
		<>
			<NavBar />
			<main className="flex w-12">
				<Outlet />
			</main>
		</>
	);
};

export default RootLayout;
