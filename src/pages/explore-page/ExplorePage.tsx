/** @format */

import React, { useEffect } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import Feeds from "../../components/feeds/Feeds";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { getPostsOnExplore } from "../../utils/post-api";
import { getAuthUser } from "../../utils/user-api";
import { getDataFromLocalStorage } from "../../utils/util";
import HomeSkeleton from "../../components/loading-skeleton/HomeSkeleton";

import { usePostCtx } from "../../context/PostContext";
import { User } from "../../models/user";
import { Post } from "../../models/post";
import { useSocketCtx } from "../../hooks/socket/useSocket";

const ExplorePage = () => {
	const { socket } = useSocketCtx();
	const { data } = useLoaderData() as {
		data: {
			userData: User;
			loadedPosts: Post[];
		};
	};
	const { setLoadedPosts, loadedPosts } = usePostCtx();

	useEffect(() => {
		socket?.on("posts", data => {
			if (data.action === "getPostsOnExplore") {
				setLoadedPosts(data.posts);
			}
		});
	}, []);

	return (
		<>
			<Suspense fallback={<HomeSkeleton />}>
				<Await
					resolve={data}
					children={data => (
						<>
							<SideBar />
							<Feeds
								posts={loadedPosts}
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
