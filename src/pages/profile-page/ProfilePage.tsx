/** @format */

import React from "react";
import Profile from "../../components/profile/Profile";

import SideBar from "../../components/side-bar/SideBar";
import SearchFriend from "../../components/search-friend/SearchFriend";
import { Posts, Users } from "../../data/dummy-data";
import { useLoaderData } from "react-router-dom";

const ProfilePage = () => {
	const data = useLoaderData() as any;

	return (
		<>
			<SideBar />
			<Profile user={data.user} userPosts={data.userPosts} />
			<SearchFriend />
		</>
	);
};

export const profilePageLoader = ({ params }: any) => {
	try {
		const user = Users.find(u => u.id === +params.id);
		const userPosts = Posts.filter(p => p.userId === user?.id);
		return {
			user,
			userPosts,
		};
	} catch (err) {
		throw err;
	}
};

export default ProfilePage;
