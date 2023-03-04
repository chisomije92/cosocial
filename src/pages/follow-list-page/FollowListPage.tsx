/** @format */

import React from "react";
import { useParams } from "react-router-dom";
import Follows from "../../components/follows/Follows";
import SearchFriend from "../../components/search-friend/SearchFriend";
import SideBar from "../../components/side-bar/SideBar";

const FollowListPage = () => {
	const { follow } = useParams();

	return (
		<>
			<SideBar />
			<Follows followList={follow!} />
			<SearchFriend />
		</>
	);
};

export default FollowListPage;
