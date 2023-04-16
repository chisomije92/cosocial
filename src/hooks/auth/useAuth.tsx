/** @format */

import React, { useEffect, useState } from "react";

import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import {
	bookmarkPost,
	commentOnPost,
	createUserPost,
	deleteReply,
	deleteUserPost,
	likePost,
	likeReply,
	updateUserPost,
} from "../../utils/post-api";
import {
	deleteSingleNotification,
	getAuthUser,
	readAllNotifications,
	readNotification,
	signIn,
	signUp,
	unreadAllNotifications,
	updatePassword,
	updateUser,
} from "../../utils/user-api";
import { addMinutes, getDataFromLocalStorage } from "../../utils/util";

const AuthContext = createContext<{
	authUser: {
		token: string;
		userId: string;
		expirationTimer: string;
		loggedInTime: string;
	} | null;
	userId: string | null;
	errorMsg: string | null;
	currentUser: any;
	isLoading: boolean;
	isSubmitting: boolean;
	post: any;
	loadedPosts: any;
	bookmarks: any;
	isPostDeleted: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	changeNotificationStatus: (id: string) => void;
	changeAllNotificationStatus: () => void;
	changeNotificationsToUnread: () => void;
	updatePost: (
		id: string,
		data: { image?: File; post: string }
	) => Promise<string>;
	createPost: (data: { image?: File; post: string }) => Promise<string>;
	deletePost: (postId: string) => Promise<string>;
	handleLikePost: (postId: string) => Promise<string>;
	handleLikeReply: (postId: string, replyId: string) => Promise<string>;
	handleBookmarkPost: (postId: string) => Promise<string>;
	authenticateUser: (data: any, isSignUp: boolean) => Promise<void>;
	handleDeleteSingleNotification: (notifId: string) => Promise<any>;
	handleUpdateUser: (data: any) => Promise<any>;
	handleUpdatePassword: (data: any) => Promise<any>;
	handleCommentOnPost: (id: string, comment: string) => Promise<any>;
	handleDeleteComment: (id: string, replyId: string) => Promise<any>;
	logout: () => void;
	autoLogout: (milliseconds: number) => void;
	setUserId: React.Dispatch<React.SetStateAction<string | null>>;
	setPost: React.Dispatch<React.SetStateAction<any | null>>;
	setAuthUser: (data: any) => void;
	setLoadedPosts: React.Dispatch<React.SetStateAction<any | null>>;
	setBookmarks: React.Dispatch<React.SetStateAction<any | null>>;
	setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
	setIsPostDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}>({
	authUser: {
		token: "",
		userId: "",
		expirationTimer: "",
		loggedInTime: "",
	},
	post: null,
	userId: null,
	errorMsg: null,
	currentUser: null,
	isLoading: false,
	isSubmitting: false,
	loadedPosts: null,
	bookmarks: [],
	isPostDeleted: false,
	authenticateUser: async () => {},
	logout: () => {},
	autoLogout: () => {},
	changeNotificationStatus: async (id: string) => {},
	changeAllNotificationStatus: () => {},
	changeNotificationsToUnread: () => {},
	updatePost: async () => Promise.resolve(""),
	createPost: async () => Promise.resolve(""),
	deletePost: async () => Promise.resolve(""),
	handleLikePost: async () => Promise.resolve(""),
	handleLikeReply: async () => Promise.resolve(""),
	handleBookmarkPost: async () => Promise.resolve(""),
	handleDeleteSingleNotification: async () => Promise.resolve([]),
	handleUpdateUser: async () => Promise.resolve(""),
	handleUpdatePassword: async () => Promise.resolve(""),
	handleCommentOnPost: async () => Promise.resolve(""),
	handleDeleteComment: async () => Promise.resolve(""),
	setUserId: () => {},
	setAuthUser: () => {},
	setIsLoading: () => {},
	setPost: () => {},
	setIsSubmitting: () => {},
	setLoadedPosts: () => {},
	setCurrentUser: () => {},
	setIsPostDeleted: () => {},
	setBookmarks: () => {},
});

export const AuthProvider: React.FC<{
	children: JSX.Element;
	user: {
		token: string;
		userId: string;
		expirationTimer: string;
		loggedInTime: string;
	};
}> = ({ children, user }) => {
	const [authUser, setAuthUser] = useLocalStorage<{
		token: string;
		userId: string;
		expirationTimer: string;
		loggedInTime: string;
	} | null>("authUser", user);
	const [userId, setUserId] = useState<string | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [currentUser, setCurrentUser] = useState<any>();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPostDeleted, setIsPostDeleted] = useState<boolean>(false);
	const [post, setPost] = useState<any>(null);
	const [loadedPosts, setLoadedPosts] = useState<any>([]);
	const [bookmarks, setBookmarks] = useState<any>([]);
	const navigate = useNavigate();

	const authenticateUser = async (
		data: { email: string; password: string; username: string },
		isSignUp: boolean
	) => {
		let resData: any;
		if (!isSignUp) {
			resData = await signIn(data);
		} else {
			resData = await signUp({
				email: data.email,
				password: data.password,
				username: data.username,
			});
		}
		if (!resData?.userId) {
			setErrorMsg(resData);
			setAuthUser(null);
		}
		const expiryDate = addMinutes(new Date().toString(), 60);

		if (resData?.userId) {
			setAuthUser({
				userId: resData.userId,
				token: resData.token,
				expirationTimer: expiryDate.toISOString(),
				loggedInTime: addMinutes(expiryDate.toString(), 2879).toISOString(),
			});
		}
	};

	const logout = () => {
		setAuthUser(null);
		setUserId(null);
		setCurrentUser(null);
	};

	const autoLogout = (milliseconds: number) => {
		setTimeout(() => {
			logout();
		}, milliseconds);
	};

	const changeNotificationStatus = async (id: string) => {
		const parsedUser = getDataFromLocalStorage();
		await readNotification(id, parsedUser.token);
		const user = await getAuthUser(parsedUser.token);
		setCurrentUser(user);
	};

	const changeAllNotificationStatus = async () => {
		const parsedUser = getDataFromLocalStorage();
		await readAllNotifications(parsedUser.token);
		const user = await getAuthUser(parsedUser.token);
		setCurrentUser(user);
	};

	const changeNotificationsToUnread = async () => {
		const parsedUser = getDataFromLocalStorage();
		await unreadAllNotifications(parsedUser.token);
		const user = await getAuthUser(parsedUser.token);

		setCurrentUser(user);
	};

	const updatePost = async (
		id: string,
		data: { image?: File; post: string }
	) => {
		const parsedUser = getDataFromLocalStorage();
		return await updateUserPost(id, parsedUser.token, data);
	};

	const createPost = async (data: { image?: File; post: string }) => {
		const parsedUser = getDataFromLocalStorage();
		const userPost = await createUserPost(parsedUser.token, data);
		return userPost;
	};

	const deletePost = async (postId: string) => {
		const parsedUser = getDataFromLocalStorage();
		const userPost = await deleteUserPost(postId, parsedUser.token);
		return userPost;
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

	const handleUpdateUser = async (data: {
		image?: File;
		description?: string;
		username?: string;
		email?: string;
	}) => {
		const parsedUser = getDataFromLocalStorage();
		const extractedUser = await updateUser(
			parsedUser.userId,
			parsedUser.token,
			data
		);
		return extractedUser;
	};

	const handleUpdatePassword = async (data: {
		newPassword: string;
		oldPassword: string;
	}) => {
		const parsedUser = getDataFromLocalStorage();
		return await updatePassword(parsedUser.token, data);
	};

	const handleDeleteSingleNotification = async (notifId: string) => {
		const parsedUser = getDataFromLocalStorage();
		const filteredNotifications = await deleteSingleNotification(
			parsedUser.token,
			notifId
		);
		return filteredNotifications;
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

	useEffect(() => {
		let submitTimer: any;
		if (isSubmitting) {
			submitTimer = setTimeout(() => {
				setIsSubmitting(false);
				setIsLoading(false);
			}, 1000);
		}
		return () => clearTimeout(submitTimer);
	}, [isSubmitting]);

	useEffect(() => {
		if (authUser && authUser.userId) {
			setUserId(authUser.userId);
			getAuthUser(authUser.token).then(res => {
				setCurrentUser(res);
			});
		} else {
			setCurrentUser(null);
			setUserId(null);
			navigate("/login", { replace: true });
		}
	}, [authUser]);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		if (errorMsg) {
			timer = setTimeout(() => {
				setErrorMsg(null);
			}, 5000);
		}
		return () => {
			clearTimeout(timer);
		};
	}, [errorMsg]);

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

	const value = {
		authUser,
		userId,
		errorMsg,
		currentUser,
		isSubmitting,
		isLoading,
		post,
		loadedPosts,
		bookmarks,
		isPostDeleted,
		authenticateUser,
		logout,
		autoLogout,
		setUserId,
		changeNotificationStatus,
		changeAllNotificationStatus,
		changeNotificationsToUnread,
		updatePost,
		createPost,
		deletePost,
		handleLikePost,
		handleLikeReply,
		handleBookmarkPost,
		handleDeleteSingleNotification,
		handleUpdateUser,
		handleUpdatePassword,
		handleCommentOnPost,
		handleDeleteComment,
		setAuthUser,
		setCurrentUser,
		setIsLoading,
		setIsSubmitting,
		setPost,
		setLoadedPosts,
		setBookmarks,
		setIsPostDeleted,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
