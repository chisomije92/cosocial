/** @format */

import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Bookmarks from "../../components/bookmarks/Bookmarks";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { getAuthUser } from "../../utils/user-api";
import { getDataFromLocalStorage } from "../../utils/util";

const BookmarkPage = () => {
	const { data }: any = useLoaderData();
	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<Await
					resolve={data}
					children={data => (
						<>
							<SideBar />
							<Bookmarks posts={data.userData} />
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
	//const loadedPosts = await getPostsOnTl(parsedUser.token, parsedUser.userId);
	return {
		userData: [...user.bookmarks],
	};
};

export const bookmarksLoader = async () => {
	return defer({
		data: loadData(),
	});
};

export default BookmarkPage;
