/** @format */

import React, { FC } from "react";
import Post from "../post/Post";
import classes from "./bookmarks.module.css";
import { Post as PostType } from "../../models/post";

const Bookmarks: FC<{
	posts: PostType[];
}> = ({ posts }) => {
	return (
		<div className={`${classes.bookmarks} mx-3`}>
			{posts.map(p => (
				<Post post={p} key={p._id} showComments={true} />
			))}
		</div>
	);
};

export default Bookmarks;
