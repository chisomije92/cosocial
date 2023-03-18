/** @format */

import React from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Feeds from "../../components/feeds/Feeds";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { getPostsOnExplore } from "../../utils/post-api";
import { getAuthUser } from "../../utils/user-api";
import { getDataFromLocalStorage, sortData } from "../../utils/util";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";

const ExplorePage = () => {
	const { data }: any = useLoaderData();

	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<Await
					resolve={data}
					children={data => (
						<>
							<SideBar />
							<Feeds
								posts={sortData(data.loadedPosts, "updatedAt")}
								areTherePosts={data.loadedPosts.length > 0}
								currentUser={data.userData}
							/>
							<RightBar />
						</>
					)}
				/>
			</Suspense>
		</>
	);
};

const loadData = async () => {
	const parsedUser = getDataFromLocalStorage();
	const user = await getAuthUser(parsedUser.token);
	const loadedPosts = await getPostsOnExplore(parsedUser.token);
	return {
		userData: { ...user },
		loadedPosts: loadedPosts,
	};
};

export const loader = async () => {
	return defer({
		data: loadData(),
	});
};
export default ExplorePage;
