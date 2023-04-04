/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Post from "../../components/post/Post";
import Replies from "../../components/replies/Replies";
import SideBar from "../../components/side-bar/SideBar";
import { getSinglePost } from "../../utils/post-api";
import { getDataFromLocalStorage } from "../../utils/util";

import { useAuth } from "../../hooks/auth/useAuth";

const SinglePostPage = () => {
	//const { selectedPost }: any = useLoaderData();
	const params = useParams();
	const [singlePost, setSinglePost] = useState<any>();
	const { loadedPosts } = useAuth();
	const navigate = useNavigate();

	const length = loadedPosts.length;

	useEffect(() => {
		if (length <= 0) {
			navigate(-1);
		}
		setSinglePost(loadedPosts.find((p: any) => p._id === params.id));
	}, [loadedPosts, length, params.id]);

	return (
		<>
			<SideBar />
			<div className="mx-2 lg:m-auto w-8 ">
				{singlePost && (
					<>
						<Post post={singlePost} />
						<Replies replies={singlePost.comments} />
					</>
				)}
			</div>
		</>
	);
};

export async function singlePostPageLoader({ params }: any) {
	const parsedUser = getDataFromLocalStorage();
	const selectedPost = await getSinglePost(params.id, parsedUser.token);
	return { selectedPost };
}

export default SinglePostPage;
