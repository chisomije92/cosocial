/** @format */

import React from "react";
import Profile from "../../components/profile/Profile";
import { useSearchParams } from "react-router-dom";

import SideBar from "../../components/side-bar/SideBar";
import SearchFriend from "../../components/search-friend/SearchFriend";

const ProfilePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const follows = searchParams.get("cosocials");
	return (
		<>
			<SideBar />

			<Profile follows={follows} />

			<SearchFriend />
		</>
	);
};

export default ProfilePage;
