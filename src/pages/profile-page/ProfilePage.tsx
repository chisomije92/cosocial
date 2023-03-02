/** @format */

import React from "react";
import Profile from "../../components/profile/Profile";
import { Navigate, useSearchParams } from "react-router-dom";

import SideBar from "../../components/side-bar/SideBar";
import SearchFriend from "../../components/search-friend/SearchFriend";
import ProtectedRoute from "../../components/protected-route/ProtectedRoute";

const ProfilePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const follows = searchParams.get("cosocials");
	return (
		//<ProtectedRoute></ProtectedRoute>
		<>
			<SideBar />
			{/*<Navigate to="/" />*/}
			<Profile follows={follows} />
			<SearchFriend />{" "}
		</>
	);
};

export default ProfilePage;
