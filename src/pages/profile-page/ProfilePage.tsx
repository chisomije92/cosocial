/** @format */

import React, { Suspense } from "react";
import Profile from "../../components/profile/Profile";

import SideBar from "../../components/side-bar/SideBar";
import SearchFriend from "../../components/search-friend/SearchFriend";

import { Await, defer, useLoaderData } from "react-router-dom";

import { getAuthUser, getUser } from "../../utils/user-api";
import { getUserPosts } from "../../utils/post-api";
import { getDataFromLocalStorage, sortData } from "../../utils/util";
import ProfilePageSkeleton from "../../components/loading-skeleton/ProfilePageSkeleton";

const ProfilePage = () => {
	const { data } = useLoaderData() as any;

	return (
		<>
			<Suspense fallback={<ProfilePageSkeleton />}>
				<Await
					resolve={data}
					children={data => (
						<>
							<SideBar />
							<Profile
								user={data.userData}
								userPosts={sortData(data.loadedPosts, "updatedAt")}
							/>
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
		user = await getAuthUser(parsedUser.token);
		loadedPosts = await getUserPosts(parsedUser.token, parsedUser.userId);
	} else {
		user = await getUser(paramsId, parsedUser.token);
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
