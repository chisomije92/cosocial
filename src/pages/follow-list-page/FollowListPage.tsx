/** @format */

import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import Follows from "../../components/follows/Follows";
import SearchFriend from "../../components/search-friend/SearchFriend";
import SideBar from "../../components/side-bar/SideBar";
import { getFollowers, getFollowing, getUser } from "../../utils/user-api";
import { getDataFromLocalStorage } from "../../utils/util";

const FollowListPage = () => {
	const { follow } = useParams();
	const userData = useLoaderData();
	return (
		<>
			<SideBar />
			<Follows followList={follow!} users={userData} />
			<SearchFriend />
		</>
	);
};

export const followListPageLoader = async ({ params }: any) => {
	const { follow, id } = params;

	let userData: any;
	const parsedUser = getDataFromLocalStorage();

	if (follow === "following") {
		userData = await getFollowing(id, parsedUser.token);
	} else {
		userData = await getFollowers(id, parsedUser.token);
	}

	return userData;
};

export default FollowListPage;
