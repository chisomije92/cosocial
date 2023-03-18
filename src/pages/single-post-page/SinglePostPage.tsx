/** @format */

import React from "react";
import { useLoaderData } from "react-router-dom";
import Post from "../../components/post/Post";
import Replies from "../../components/replies/Replies";
import SideBar from "../../components/side-bar/SideBar";
import { Posts } from "../../data/dummy-data";
import { getSinglePost } from "../../utils/post-api";
import { getDataFromLocalStorage } from "../../utils/util";

const SinglePostPage = () => {
	const post: any = useLoaderData();

	console.log(post.comments);

	return (
		<>
			<SideBar />
			<div className="mx-2 lg:m-auto w-8 ">
				<Post post={post} />
				<Replies replies={post.comments} />
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
