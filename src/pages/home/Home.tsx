/** @format */

import { Suspense, useEffect } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Feeds from "../../components/feeds/Feeds";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { getPostsOnTl } from "../../utils/post-api";
import { getAuthUser } from "../../utils/user-api";
import { getDataFromLocalStorage, sortData } from "../../utils/util";
import HomeSkeleton from "../../components/loading-skeleton/HomeSkeleton";
import { usePostCtx } from "../../context/PostContext";
import { LoaderData } from "../../models/loader-data";
import { useSocketCtx } from "../../hooks/socket/useSocket";

export default function Home() {
	const { socket } = useSocketCtx();
	const { data } = useLoaderData() as LoaderData;
	const { setLoadedPosts, loadedPosts } = usePostCtx();

	useEffect(() => {
		socket?.on("posts", data => {
			if (data.action === "getPostsOnTL") {
				setLoadedPosts(data.posts);
			}
		});
	}, [socket]);
	return (
		<>
			<Suspense fallback={<HomeSkeleton />}>
				<Await
					resolve={data}
					children={data => {
						return (
							<>
								<SideBar />
								<Feeds
									currentUser={data.userData}
									posts={sortData(loadedPosts, "createdAt")}
									areTherePosts={data.loadedPosts.length > 0}
								/>

								<RightBar />
							</>
						);
					}}
				/>
			</Suspense>
		</>
	);
}

const loadData = async () => {
	const parsedUser = getDataFromLocalStorage();
	const user = await getAuthUser(parsedUser.token);
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
