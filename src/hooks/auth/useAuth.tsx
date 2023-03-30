/** @format */

import React, { useEffect, useState } from "react";

import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { createUserPost, updateUserPost } from "../../utils/post-api";
import {
	getAuthUser,
	readAllNotifications,
	readNotification,
	signIn,
	signUp,
	unreadAllNotifications,
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
	authenticateUser: (data: any, isSignUp: boolean) => Promise<void>;
	logout: () => void;
	autoLogout: (milliseconds: number) => void;
	setUserId: React.Dispatch<React.SetStateAction<string | null>>;
	setPost: React.Dispatch<React.SetStateAction<string | null>>;
	setAuthUser: (data: any) => void;
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
	authenticateUser: async () => {},
	logout: () => {},
	autoLogout: () => {},
	changeNotificationStatus: async (id: string) => {},
	changeAllNotificationStatus: () => {},
	changeNotificationsToUnread: () => {},
	updatePost: async () => Promise.resolve(""),
	createPost: async () => Promise.resolve(""),
	setUserId: () => {},
	setAuthUser: () => {},
	setIsLoading: () => {},
	setPost: () => {},
	setIsSubmitting: () => {},
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
	const [post, setPost] = useState<any>(null);
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

	const value = {
		authUser,
		userId,
		errorMsg,
		currentUser,
		isSubmitting,
		isLoading,
		post,
		authenticateUser,
		logout,
		autoLogout,
		setUserId,
		changeNotificationStatus,
		changeAllNotificationStatus,
		changeNotificationsToUnread,
		updatePost,
		createPost,
		setAuthUser,
		setIsLoading,
		setIsSubmitting,
		setPost,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
