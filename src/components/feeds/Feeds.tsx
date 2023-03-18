/** @format */

import React, { FC, useEffect } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import NoPosts from "../no-posts/NoPosts";
import Post from "../post/Post";
import Share from "../share/Share";
import classes from "./feeds.module.css";

interface FeedsInterface {
	posts: any;
	user?: any;
	isExploring?: boolean;
	areTherePosts?: boolean;
	currentUser: any;
}

const Feeds: FC<FeedsInterface> = ({
	posts,
	user,
	areTherePosts,
	isExploring,
	currentUser,
}) => {
	const { authUser } = useAuth();
	return (
		<div className={`${classes.feeds}`}>
			<div className="p-4 flex flex-column">
				{!isExploring && <Share currentUser={currentUser} />}
				{!areTherePosts && <NoPosts />}
				{areTherePosts &&
					posts.map((p: any) => (
						<Post
							post={p}
							user={user}
							key={p._id}
							showComments={true}
							isAuthUser={p.userId === authUser?.userId}
						/>
					))}
			</div>
		</div>
	);
};

export default Feeds;
