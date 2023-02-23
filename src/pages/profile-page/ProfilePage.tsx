/** @format */

import React from "react";
import Profile from "../../components/profile/Profile";
import Follows from "../../components/follows/Follows";
import { useSearchParams } from "react-router-dom";
import SearchFriend from "../../components/search-friend/SearchFriend";

const ProfilePage = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const follows = searchParams.get("cosocials");
	return (
		<>
			<SearchFriend />
			<Profile />
			{follows ? (
				<Follows follows={follows} />
			) : (
				<Follows follows={"followers"} />
			)}
		</>
	);
};

export default ProfilePage;
