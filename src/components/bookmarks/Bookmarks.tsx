/** @format */

import React, { FC } from "react";
import Post from "../post/Post";
import classes from "./bookmarks.module.css";

const Bookmarks: FC<{
	posts: any;
}> = ({ posts }) => {
	return (
		<div className={`${classes.bookmarks} mx-3`}>
			{posts.map((p: any) => (
				<Post post={p} key={p._id} showComments={true} />
			))}
		</div>
	);
};

export default Bookmarks;
