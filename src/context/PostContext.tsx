/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../utils/util";
import {
	bookmarkPost,
	commentOnPost,
	createUserPost,
	deleteReply,
	deleteUserPost,
	likePost,
	likeReply,
	updateUserPost,
} from "../utils/post-api";

const PostContext = createContext<{
	post: any;
	loadedPosts: any;
	isPostDeleted: boolean;
	updatePost: (
		id: string,
		data: { image?: File; post: string }
	) => Promise<string>;
	createPost: (data: { image?: File; post: string }) => Promise<string>;
	deletePost: (postId: string) => Promise<string>;
	handleLikePost: (postId: string) => Promise<string>;
	handleBookmarkPost: (postId: string) => Promise<string>;
	handleCommentOnPost: (id: string, comment: string) => Promise<any>;
	handleDeleteComment: (id: string, replyId: string) => Promise<any>;
	handleLikeReply: (postId: string, replyId: string) => Promise<string>;
	setLoadedPosts: React.Dispatch<React.SetStateAction<any | null>>;
	setIsPostDeleted: React.Dispatch<React.SetStateAction<boolean>>;
	setPost: React.Dispatch<React.SetStateAction<any | null>>;
}>({
	post: null,
	loadedPosts: [],
	isPostDeleted: false,
	updatePost: async () => Promise.resolve(""),
	createPost: async () => Promise.resolve(""),
	deletePost: async () => Promise.resolve(""),
	handleLikePost: async () => Promise.resolve(""),
	handleBookmarkPost: async () => Promise.resolve(""),
	handleCommentOnPost: async () => Promise.resolve(""),
	handleDeleteComment: async () => Promise.resolve(""),
	handleLikeReply: async () => Promise.resolve(""),
	setLoadedPosts: () => {},
	setIsPostDeleted: () => {},
	setPost: () => {},
});

export const PostProvider: React.FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const [isPostDeleted, setIsPostDeleted] = useState<boolean>(false);

	const [post, setPost] = useState<any>(null);
	const [loadedPosts, setLoadedPosts] = useState<any>([]);
	const createPost = async (data: { image?: File; post: string }) => {
		const parsedUser = getDataFromLocalStorage();
		const userPost = await createUserPost(parsedUser.token, data);
		return userPost;
	};

	useEffect(() => {
		if (post) {
			setLoadedPosts((prevPosts: any) => {
				const isPostFound =
					prevPosts.findIndex((p: any) => p._id === post._id) >= 0;
				if (isPostFound && isPostDeleted) {
					const filteredPosts = prevPosts.filter(
						(p: any) => p._id !== post._id
					);

					return [...filteredPosts];
				} else if (isPostFound && !isPostDeleted) {
					return [...prevPosts];
				} else {
					return [post, ...prevPosts];
				}
			});
		}
	}, [post, isPostDeleted]);

	const deletePost = async (postId: string) => {
		const parsedUser = getDataFromLocalStorage();
		const userPost = await deleteUserPost(postId, parsedUser.token);
		return userPost;
	};

	const updatePost = async (
		id: string,
		data: { image?: File; post: string }
	) => {
		const parsedUser = getDataFromLocalStorage();
		return await updateUserPost(id, parsedUser.token, data);
	};

	const handleLikePost = async (postId: string) => {
		const parsedUser = getDataFromLocalStorage();
		const userPost = await likePost(postId, parsedUser.token);
		return userPost;
	};

	const handleBookmarkPost = async (postId: string) => {
		const parsedUser = getDataFromLocalStorage();
		const response = await bookmarkPost(postId, parsedUser.token);
		return response;
	};

	const handleLikeReply = async (id: string, replyId: string) => {
		const parsedUser = getDataFromLocalStorage();
		return await likeReply(id, replyId, parsedUser.token);
	};

	const handleCommentOnPost = async (id: string, comment: string) => {
		const parsedUser = getDataFromLocalStorage();
		return await commentOnPost(id, comment, parsedUser.token);
	};

	const handleDeleteComment = async (id: string, replyId: string) => {
		const parsedUser = getDataFromLocalStorage();
		return await deleteReply(id, replyId, parsedUser.token);
	};
	const value = {
		post,
		loadedPosts,
		isPostDeleted,
		updatePost,
		createPost,
		deletePost,
		handleLikePost,
		setPost,
		setLoadedPosts,
		setIsPostDeleted,
		handleBookmarkPost,
		handleCommentOnPost,
		handleDeleteComment,
		handleLikeReply,
	};

	return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

export const usePostCtx = () => {
	return useContext(PostContext);
};
