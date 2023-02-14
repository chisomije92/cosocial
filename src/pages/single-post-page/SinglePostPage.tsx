/** @format */

import React from "react";
import { useLoaderData } from "react-router-dom";
import Post from "../../components/post/Post";
import Replies from "../../components/replies/Replies";
import { Posts } from "../../data/dummy-data";

const SinglePostPage = () => {
	const post: any = useLoaderData();
	return (
		<div className="m-auto w-6">
			<Post post={post} />
			<Replies replies={post.replies} />
		</div>
	);
};

export async function loader({ params }: any) {
	const selectedPost = Posts.find(post => post.id === +params.id);
	console.log(selectedPost);
	return selectedPost;
}

export default SinglePostPage;
