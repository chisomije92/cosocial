/** @format */

import Bookmarks from "../../components/bookmarks/Bookmarks";
import React, { useEffect, useState } from "react";
import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { useAuth } from "../../hooks/auth/useAuth";
import NoBookmarks from "../../components/bookmarks/NoBookmarks";
import BookmarkSkeleton from "../../components/loading-skeleton/BookmarkSkeleton";
import { usePostCtx } from "../../context/PostContext";

const BookmarkPage = () => {
	const { currentUser } = useAuth();
	const { setLoadedPosts, loadedPosts } = usePostCtx();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const userBookmarks = currentUser && currentUser.bookmarks.length > 0;

	useEffect(() => {
		if (userBookmarks) {
			setLoadedPosts(currentUser.bookmarks);
		} else {
			setLoadedPosts([]);
		}
		setIsLoading(false);
	}, [userBookmarks, currentUser?.bookmarks]);

	return (
		<>
			<SideBar />
			{(isLoading || !currentUser) && <BookmarkSkeleton />}
			{currentUser && currentUser.bookmarks?.length <= 0 && !isLoading && (
				<NoBookmarks />
			)}
			{loadedPosts.length > 0 && !isLoading && (
				<Bookmarks posts={loadedPosts} />
			)}

			<RightBar />
		</>
	);
};

export default BookmarkPage;
