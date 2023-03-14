/** @format */

import React, { Suspense } from "react";
import Profile from "../../components/profile/Profile";

import SideBar from "../../components/side-bar/SideBar";
import SearchFriend from "../../components/search-friend/SearchFriend";
import { Posts, Users } from "../../data/dummy-data";
import { Await, defer, useLoaderData } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { getAuthUser, getUser } from "../../utils/user-api";

const ProfilePage = () => {
	const { data } = useLoaderData() as any;
	console.log(data.user);

	return (
		<>
			<Suspense
				fallback={
					//<ProgressBar
					//	mode="indeterminate"
					//	style={{ height: "6px" }}
					//></ProgressBar>
					<div>Loading...</div>
				}
			>
				<Await
					resolve={data}
					children={user => (
						<>
							<SideBar />
							<Profile user={data.user} userPosts={[]} />
							<SearchFriend />
						</>
					)}
				/>
			</Suspense>
		</>
	);
};

export const profilePageLoader = async ({ params }: any) => {
	//try {
	//	const user = Users.find(u => u.id === +params.id);
	//	const userPosts = Posts.filter(p => p.userId === user?.id);
	//	//console.log(localStorage.getItem("authUser"));
	//	const authUser = localStorage.getItem("authUser");
	//	if (authUser) {
	//		const parsedUser = JSON.parse(authUser);
	//		console.log(parsedUser.token);
	//	}

	//	return {
	//		user,
	//		userPosts,
	//	};
	//} catch (err: any) {
	//	throw err;
	//}
	try {
		let user: any;
		let parsedUser;
		const authUser = localStorage.getItem("authUser");
		if (authUser) {
			parsedUser = JSON.parse(authUser);
		}
		const userPosts = Posts.filter(p => p.userId === user?.id);
		if (!params.id) {
			//user = await getAuthUser(parsedUser.token);
			return defer({
				data: { user: getAuthUser(parsedUser.token) },
			});
		} else {
			//user = await getUser(params.id, parsedUser.token);
			return defer({
				user: getUser(params.id, parsedUser.token),
				//userPosts: userPosts,
			});
		}
		//return defer({
		//	user,
		//	userPosts,
		//});
	} catch (err: any) {
		throw err;
	}
};

export default ProfilePage;
