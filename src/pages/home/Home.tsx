/** @format */

import { Suspense, useState } from "react";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";
import Feeds from "../../components/feeds/Feeds";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { getPostsOnTl, updateUserPost } from "../../utils/post-api";
import { getAuthUser } from "../../utils/user-api";
import { getDataFromLocalStorage, sortData } from "../../utils/util";
import HomeSkeleton from "../../components/loading-skeleton/HomeSkeleton";
import openSocket from "socket.io-client";
import { urlString } from "../../utils/constants/constants";

export default function Home() {
	const { data }: any = useLoaderData();
	//const [loadedPosts, setLoadedPosts] = useState([]);

	const addPosts = (posts: any) => {
		const socket = openSocket("http://localhost:8000");
		let updatedPosts = posts;
		//console.log(updatedPosts);
		socket.on("posts", data => {
			if (data.action === "create") {
				console.log(data.post);
				updatedPosts = [data.post, ...posts];
			}
		});
		return updatedPosts;
	};
	//const socket = openSocket(urlString);
	//socket.connect();
	return (
		<>
			<Suspense fallback={<HomeSkeleton />}>
				<Await
					resolve={data}
					children={data => (
						<>
							<SideBar />
							<Feeds
								currentUser={data.userData}
								posts={sortData(data.loadedPosts, "updatedAt")}
								//posts={addPosts(data.loadedPosts)}
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
