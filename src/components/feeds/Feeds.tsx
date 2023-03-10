/** @format */

import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import Post from "../post/Post";
import Share from "../share/Share";
import classes from "./feeds.module.css";

const Feeds: FC<{
	posts: any;
	isExploring?: boolean;
}> = ({ posts, isExploring }) => {
	const { userId } = useAuth();
	const navigate = useNavigate();

	//useEffect(() => {
	//	if (!userId) {
	//		navigate("/login");
	//	}
	//}, [userId]);

	return (
		<div className={`${classes.feeds}`}>
			<div className="p-4 flex flex-column">
				{!isExploring && <Share />}
				{posts.map((p: any) => (
					<Post post={p} key={p.id} showComments={true} />
				))}
			</div>
		</div>
	);
};

export default Feeds;
