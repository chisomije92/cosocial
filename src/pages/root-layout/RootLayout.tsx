/** @format */

import React, { useEffect } from "react";
import NavBar from "../../components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/auth/useAuth";
import { addMinutes, getDataFromLocalStorage } from "../../utils/util";

const RootLayout = () => {
	const { logout } = useAuth();

	const parsedUser = getDataFromLocalStorage();
	useEffect(() => {
		let expTimer: any;
		if (parsedUser) {
			const expirationDuration =
				new Date(parsedUser.expirationTimer).getTime() - new Date().getTime();
			const authDuration =
				new Date(parsedUser.loggedInTime).getTime() - new Date().getTime();
			if (expirationDuration >= authDuration) {
				expTimer = setTimeout(() => {
					logout();
				}, 0);
			}
			if (expirationDuration <= 960000) {
				const dateTimer = addMinutes(parsedUser.expirationTimer, 15);
				const authUser = JSON.stringify({
					...parsedUser,
					expirationTimer: dateTimer.toISOString(),
				});
				localStorage.setItem("authUser", authUser);
				expTimer = setTimeout(() => {
					logout();
				}, expirationDuration);
			}

			return () => clearTimeout(expTimer);
		}
	}, [parsedUser]);

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
