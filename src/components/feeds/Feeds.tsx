/** @format */

import { FC } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import PostSkeleton from "../loading-skeleton/PostSkeleton";
import NoPosts from "../no-posts/NoPosts";
import Post from "../post/Post";
import Share from "../share/Share";
import classes from "./feeds.module.css";
import { Post as PostType } from "../../models/post";
import { User } from "../../models/user";

interface FeedsInterface {
	posts: PostType[];
	user?: User;
	isExploring?: boolean;
	areTherePosts?: boolean;
	currentUser: User;
}

const Feeds: FC<FeedsInterface> = ({
	posts,
	user,
	isExploring,
	currentUser,
}) => {
	const { authUser } = useAuth();

	return (
		<div className={`${classes.feeds}`}>
			<div className="p-4 flex flex-column">
				{!isExploring && <Share currentUser={currentUser} />}
				{posts.length <= 0 && <NoPosts />}

				{posts &&
					posts.map(p => (
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
