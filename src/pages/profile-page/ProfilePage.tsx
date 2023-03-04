/** @format */

import React from "react";
import Profile from "../../components/profile/Profile";

import SideBar from "../../components/side-bar/SideBar";
import SearchFriend from "../../components/search-friend/SearchFriend";

const ProfilePage = () => {
	return (
		<>
			<SideBar />
			<Profile />
			<SearchFriend />
		</>
	);
};

export default ProfilePage;
