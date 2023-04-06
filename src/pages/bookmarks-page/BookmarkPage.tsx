/** @format */

import React, { Suspense, useEffect } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Bookmarks from "../../components/bookmarks/Bookmarks";

import BookmarksPageSkeleton from "../../components/loading-skeleton/BookmarksPageSkeleton";

import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { getAuthUser } from "../../utils/user-api";
import { getBookmarks } from "../../utils/post-api";
import { getDataFromLocalStorage } from "../../utils/util";
import { socket } from "../../utils/constants/constants";
import { useAuth } from "../../hooks/auth/useAuth";

const BookmarkPage = () => {
	const { data }: any = useLoaderData();
	const { setCurrentUser, currentUser, setLoadedPosts, loadedPosts } =
		useAuth();
	const [posts, setPosts] = React.useState<any>();

	useEffect(() => {
		//socket.on("posts", data => {
		//	if (data.action === "getBookmarks") {
		//		//setCurrentUser((prevUser: any) => ({
		//		//	...prevUser,
		//		//	bookmarks: data.posts,
		//		//}));
		//		setLoadedPosts(data.posts);
		//	}
		//	//if (data.action === "bookmark") {
		//	//	setCurrentUser(data.user);
		//	//}
		//});
		function getDataPosts(data: any) {
			console.log(data.posts);
		}
		//socket.on("bookmarks", (data: any) => {
		//	console.log(data.posts);
		//});
		//socket.emit("bookmarks", "test", (res: any) => {
		//	console.log(res.posts);
		//	setLoadedPosts(res.posts);
		//});
	}, []);
	return (
		<>
			<Suspense fallback={<BookmarksPageSkeleton />}>
				<Await
					resolve={data}
					children={data => {
						return (
							<>
								<SideBar />
								{/*{!currentUser.bookmarks && (
								<div className="flex">
									<p>You have no bookmarks yet</p>
								</div>
							)}*/}
								{/*<Bookmarks posts={currentUser && currentUser.bookmarks} />*/}
								<Bookmarks posts={currentUser && currentUser.bookmarks} />
								<RightBar />
							</>
						);
					}}
				/>
			</Suspense>
		</>
	);
};

const loadData = async () => {
	const parsedUser = getDataFromLocalStorage();
	const bookmarks = await getBookmarks(parsedUser.token);
	return { bookmarks };
};

export const bookmarksLoader = async () => {
	return defer({
		data: loadData(),
	});
};

export default BookmarkPage;
