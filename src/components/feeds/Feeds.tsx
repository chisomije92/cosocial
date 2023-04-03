/** @format */

import { FC, useEffect, useState } from "react";
import { useAuth } from "../../hooks/auth/useAuth";
import { socket } from "../../utils/constants/constants";
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
	const {
		authUser,
		post,
		loadedPosts,
		setLoadedPosts,
		deletePost,
		isPostDeleted,
		setIsPostDeleted,
	} = useAuth();

	useEffect(() => {
		setLoadedPosts(posts);
	}, [posts]);

	useEffect(() => {
		if (post) {
			//setLoadedPosts((prevLoadedPosts: any) => {
			//	if (prevLoadedPosts.findIndex((p: any) => p._id === post._id) >= 0) {
			//		return [...prevLoadedPosts];
			//	} else {
			//		return [post, ...prevLoadedPosts];
			//	}
			//});
			//const isPostFound =
			//	loadedPosts.findIndex((p: any) => p._id === post._id) >= 0;
			//if(isPostFound && isPostDeleted){
			//const filteredPosts = [...loadedPosts].filter(
			//	(p: any) => p._id !== post._id
			//);
			//	setLoadedPosts(filteredPosts)
			//}else if (isPostFound && !isPostDeleted){

			//}
			setLoadedPosts((prevPosts: any) => {
				const isPostFound =
					prevPosts.findIndex((p: any) => p._id === post._id) >= 0;
				if (isPostFound && isPostDeleted) {
					const filteredPosts = prevPosts.filter(
						(p: any) => p._id !== post._id
					);
					console.log("post is found and deleted is true");
					setIsPostDeleted(false);
					return [...filteredPosts];
				} else if (isPostFound && !isPostDeleted) {
					console.log("post is found and deleted is false");
					return [...prevPosts];
				} else {
					console.log("post is not found and deleted is false");
					return [post, ...prevPosts];
				}
			});
			console.log(loadedPosts);
		}
	}, [post]);

	return (
		<div className={`${classes.feeds}`}>
			<div className="p-4 flex flex-column">
				{!isExploring && <Share currentUser={currentUser} />}
				{!areTherePosts && !loadedPosts && <NoPosts />}
				{areTherePosts &&
					loadedPosts &&
					loadedPosts.map((p: any) => (
						<Post
							post={p}
							user={user}
							key={p._id}
							showComments={true}
							isAuthUser={p.userId === authUser?.userId}
						/>
					))}
				{!loadedPosts && [1, 2, 3].map(v => <PostSkeleton key={v} />)}
			</div>
		</div>
	);
};

export default Feeds;
