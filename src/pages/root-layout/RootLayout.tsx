/** @format */

import React, { useEffect } from "react";
import NavBar from "../../components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";
import { getDataFromLocalStorage } from "../../utils/util";
import { useAuth } from "../../hooks/auth/useAuth";

const RootLayout = () => {
	const { autoLogout } = useAuth();
	const data = getDataFromLocalStorage();
	const expirationDuration =
		new Date(data?.expirationTimer ? data.expirationTimer : 0).getTime() -
		new Date().getTime();

	useEffect(() => {
		autoLogout(expirationDuration);
	}, [expirationDuration]);

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
