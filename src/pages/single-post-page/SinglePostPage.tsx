/** @format */

import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Post from "../../components/post/Post";
import Replies from "../../components/replies/Replies";
import SideBar from "../../components/side-bar/SideBar";
import { getSinglePost } from "../../utils/post-api";
import { getDataFromLocalStorage } from "../../utils/util";

import { useAuth } from "../../hooks/auth/useAuth";
import PostSkeleton from "../../components/loading-skeleton/PostSkeleton";
import { socket } from "../../utils/constants/constants";

const SinglePostPage = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const { loadedPosts, setLoadedPosts } = useAuth();
	const data = useLoaderData() as any;

	useEffect(() => {
		setLoadedPosts([{ ...data }]);
		setLoading(false);
	}, []);

	//useEffect(() => {
	//	socket.on("posts", data => {
	//		if (data.action === "comment") {
	//			const updatedPost = [...loadedPosts];
	//			updatedPost[0].comments = data?.comments;
	//			setLoadedPosts(updatedPost);
	//			//setLoading(false);
	//			setComment("");
	//		}
	//	});
	//}, [loadedPosts]);

	return (
		<>
			<SideBar />
			<div className="mx-2 lg:m-auto w-8 ">
				{loadedPosts.length >= 1 && !loading && (
					<>
						<Post post={loadedPosts[0]} />
						<Replies replies={loadedPosts[0].comments} />
					</>
				)}
				{loadedPosts.length === 0 && loading && <PostSkeleton />}
			</div>
		</>
	);
};

export async function singlePostPageLoader({ params }: any) {
	const parsedUser = getDataFromLocalStorage();
	const selectedPost = await getSinglePost(params.id, parsedUser.token);

	return selectedPost;
}

export default SinglePostPage;
