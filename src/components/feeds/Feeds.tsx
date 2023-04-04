/** @format */

import { FC } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import PostSkeleton from "../loading-skeleton/PostSkeleton";
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
	const { authUser, loadedPosts } = useAuth();

	return (
		<div className={`${classes.feeds}`}>
			<div className="p-4 flex flex-column">
				{!isExploring && <Share currentUser={currentUser} />}
				{!areTherePosts && !loadedPosts && <NoPosts />}

				{posts &&
					posts.map((p: any) => (
						<Post
							post={p}
							user={user}
							key={p._id}
							showComments={true}
							isAuthUser={p.userId === authUser?.userId}
						/>
					))}
				{!posts && [1, 2, 3].map(v => <PostSkeleton key={v} />)}
			</div>
		</div>
	);
};

export default Feeds;
