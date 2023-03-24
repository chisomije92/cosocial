/** @format */

import React, { useEffect } from "react";
import NavBar from "../../components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";
import { addMinutes } from "../../utils/util";

const RootLayout = () => {
	const { autoLogout, authUser, setAuthUser } = useAuth();
	let dataExpirationTimer = authUser && authUser.expirationTimer;

	useEffect(() => {
		if (dataExpirationTimer) {
			autoLogout(
				new Date(dataExpirationTimer).getTime() - new Date().getTime()
			);
		}
	}, [dataExpirationTimer]);

	// User has switched back to the tab
	//const onFocus = () => {
	//	console.log("Tab is in focus");
	//	if (authUser) {
	//		const dateTimer = addMinutes(authUser.expirationTimer, 15);
	//		setAuthUser({
	//			...authUser,
	//			expirationTimer: dateTimer.toISOString(),
	//		});
	//		console.log(authUser.expirationTimer);
	//	}
	//};

	//// User has switched away from the tab (AKA tab is hidden)
	//const onBlur = () => {
	//	console.log("Tab is blurred");
	//};

	//useEffect(() => {
	//	window.addEventListener("focus", onFocus);
	//	window.addEventListener("blur", onBlur);
	//	// Calls onFocus when the window first loads
	//	onFocus();
	//	// Specify how to clean up after this effect:
	//	return () => {
	//		window.removeEventListener("focus", onFocus);
	//		window.removeEventListener("blur", onBlur);
	//	};
	//}, []);

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
