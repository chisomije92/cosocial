/** @format */

import React, { Suspense } from "react";
import Profile from "../../components/profile/Profile";

import SideBar from "../../components/side-bar/SideBar";
import SearchFriend from "../../components/search-friend/SearchFriend";
import { Posts, Users } from "../../data/dummy-data";
import { Await, defer, useLoaderData } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { getAuthUser, getUser } from "../../utils/user-api";
import { getUserPosts } from "../../utils/post-api";
import { getDataFromLocalStorage } from "../../utils/util";

const ProfilePage = () => {
	const { data } = useLoaderData() as any;

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
					children={data => (
						<>
							<SideBar />
							<Profile user={data.userData} userPosts={data.loadedPosts} />
							<SearchFriend />
						</>
					)}
				/>
			</Suspense>
		</>
	);
};

const loadData = async (paramsId?: string) => {
	let user;
	let loadedPosts;
	let parsedUser = getDataFromLocalStorage();

	if (!paramsId) {
		user = await getAuthUser(parsedUser.token, parsedUser.userId);
		loadedPosts = await getUserPosts(parsedUser.token, parsedUser.userId);
	} else {
		user = await getUser(paramsId, parsedUser.userId);
		loadedPosts = await getUserPosts(parsedUser.token, parsedUser.userId);
	}

	return {
		userData: { ...user },
		loadedPosts: loadedPosts,
	};
};

export const profilePageLoader = async ({ params }: any) => {
	try {
		if (!params.id) {
			return defer({
				data: loadData(),
			});
		} else {
			return defer({
				data: loadData(params.id),
			});
		}
	} catch (err: any) {
		throw err;
	}
};

export default ProfilePage;
