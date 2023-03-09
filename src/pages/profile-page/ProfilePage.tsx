/** @format */

import React, { Suspense } from "react";
import Profile from "../../components/profile/Profile";

import SideBar from "../../components/side-bar/SideBar";
import SearchFriend from "../../components/search-friend/SearchFriend";
import { Posts, Users } from "../../data/dummy-data";
import { Await, defer, useLoaderData } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";

const ProfilePage = () => {
	const data = useLoaderData() as any;
	console.log(data);
	return (
		<>
			<SideBar />
			<Profile user={data.user} userPosts={data.userPosts} />
			<SearchFriend />
			{/*<Suspense
				fallback={
					<ProgressBar
						mode="indeterminate"
						style={{ height: "6px" }}
					></ProgressBar>
				}
			>
				<Await
					resolve={data}
					children={data => (
						<>
							<SideBar />
							<Profile user={data.user} userPosts={data.userPosts} />
							<SearchFriend />
						</>
					)}
				/>
			</Suspense>*/}
		</>
	);
};

export const profilePageLoader = async ({ params }: any) => {
	try {
		const user = Users.find(u => u.id === +params.id);
		const userPosts = Posts.filter(p => p.userId === user?.id);
		return {
			user,
			userPosts,
		};
	} catch (err: any) {
		throw err;
	}
};

export default ProfilePage;
