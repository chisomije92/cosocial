/** @format */

import React, { FC } from "react";
//import { Posts } from "../../data/dummy-data";
import Post from "../post/Post";
import Share from "../share/Share";
import classes from "./feeds.module.css";

const Feeds: FC<{
	posts: any;
	isExploring?: boolean;
}> = ({ posts, isExploring }) => {
	return (
		<div className={`${classes.feeds}`}>
			<div className="p-4">
				{!isExploring && <Share />}
				{posts.map((p: any) => (
					<Post post={p} key={p.id} showComments={true} />
				))}
			</div>
		</div>
	);
};

export default Feeds;
