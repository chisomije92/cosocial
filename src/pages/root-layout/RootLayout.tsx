/** @format */

import React from "react";
import NavBar from "../../components/nav-bar/NavBar";
import { Outlet, useLoaderData } from "react-router-dom";
import { getDataFromLocalStorage } from "../../utils/util";
import { getAuthUser } from "../../utils/user-api";

const RootLayout = () => {
	const data = useLoaderData();

	return (
		<>
			<NavBar currentUser={data} />
			<main className="flex w-12">
				<Outlet />
			</main>
		</>
	);
};

export const layoutLoader = async () => {
	const parsedData = getDataFromLocalStorage();
	const user = await getAuthUser(parsedData.token, parsedData.id);
	return user;
};

export default RootLayout;
