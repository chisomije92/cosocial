/** @format */

import React from "react";
import { Posts } from "../../data/dummy-data";
import Post from "../post/Post";
import classes from "./bookmarks.module.css";

const Bookmarks = () => {
	return (
		<div className={`${classes.bookmarks} mx-3`}>
			{Posts.map(p => (
				<Post post={p} key={p.id} />
			))}
		</div>
	);
};

export default Bookmarks;
