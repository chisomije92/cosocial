/** @format */

import Bookmarks from "../../components/bookmarks/Bookmarks";

import RightBar from "../../components/right-bar/RightBar";
import SideBar from "../../components/side-bar/SideBar";
import { useAuth } from "../../hooks/auth/useAuth";
import NoBookmarks from "../../components/bookmarks/NoBookmarks";
import BookmarkSkeleton from "../../components/loading-skeleton/BookmarkSkeleton";

const BookmarkPage = () => {
	const { currentUser } = useAuth();

	const userBookmarks = currentUser && currentUser.bookmarks;
	const noUserBookmarks = currentUser && currentUser.bookmarks.length <= 0;

	return (
		<>
			<SideBar />
			{!currentUser && <BookmarkSkeleton />}
			{noUserBookmarks && <NoBookmarks />}
			{userBookmarks && !noUserBookmarks && <Bookmarks posts={userBookmarks} />}

			<RightBar />
		</>
	);
};

export default BookmarkPage;
