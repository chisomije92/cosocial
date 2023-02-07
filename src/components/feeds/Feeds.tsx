/** @format */

import React from "react";
import { Posts } from "../../data/dummy-data";
import Post from "../post/Post";
import Share from "../share/Share";
import classes from "./feeds.module.css";

export default function Feeds() {
	return (
		<div className={`${classes.feeds}`}>
			<div className="p-4">
				<Share />
				{Posts.map(p => (
					<Post post={p} key={p.id} />
				))}
			</div>
		</div>
	);
}
