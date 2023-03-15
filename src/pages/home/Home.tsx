/** @format */

import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Feeds from "../../components/feeds/Feeds";
import RightBar from "../../components/right-bar/RightBar";

import SideBar from "../../components/side-bar/SideBar";

import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import { getPostsOnTl } from "../../utils/post-api";
import { getAuthUser } from "../../utils/user-api";
import { getDataFromLocalStorage } from "../../utils/util";

export default function Home() {
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
								currentUser={data.userData}
								posts={data.loadedPosts}
								areTherePosts={data.loadedPosts.length > 0}
							/>
							<RightBar />
						</>
					)}
				/>
			</Suspense>
		</>
	);
}

const loadData = async () => {
	const parsedUser = getDataFromLocalStorage();
	const user = await getAuthUser(parsedUser.token, parsedUser.userId);
	const loadedPosts = await getPostsOnTl(parsedUser.token, parsedUser.userId);
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
