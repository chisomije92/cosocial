/** @format */

import React from "react";
import BookmarkSkeleton from "./BookmarkSkeleton";
import RightBarSkeleton from "./RightBarSkeleton";
import SideBarSkeleton from "./SideBarSkeleton";

const BookmarksPageSkeleton = () => {
	return (
		<>
			<SideBarSkeleton />
			<BookmarkSkeleton />
			<RightBarSkeleton />
		</>
	);
};

export default BookmarksPageSkeleton;
