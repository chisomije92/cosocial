/** @format */

import React from "react";
import { useLoaderData } from "react-router-dom";
import Post from "../../components/post/Post";
import Replies from "../../components/replies/Replies";
import SideBar from "../../components/side-bar/SideBar";
import { Posts } from "../../data/dummy-data";

const SinglePostPage = () => {
	const post: any = useLoaderData();
	return (
		<>
			<SideBar />
			<div className="mx-2 lg:m-auto w-8 ">
				<Post post={post} />
				<Replies replies={post.replies} />
			</div>
		</>
	);
};

export async function loader({ params }: any) {
	const selectedPost = Posts.find(post => post.id === +params.id);
	console.log(selectedPost);
	return selectedPost;
}

export default SinglePostPage;
