/** @format */

import React from "react";
import classes from "../bookmarks/bookmarks.module.css";
import PostSkeleton from "./PostSkeleton";
const BookmarkSkeleton = () => {
	const sampleArr = [1, 2, 3];
	return (
		<div className={`${classes.bookmarks} mx-3`}>
			{sampleArr.map(v => (
				<PostSkeleton key={v} />
			))}
		</div>
	);
};

export default BookmarkSkeleton;
