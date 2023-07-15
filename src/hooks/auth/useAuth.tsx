/** @format */

import React, { useEffect, useState } from "react";

import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import {
	followUser,
	getAuthUser,
	getFollowing,
	getNonFollowing,
	signIn,
	signUp,
	unFollowUser,
	updatePassword,
	updateUser,
} from "../../utils/user-api";
import { addMinutes, getDataFromLocalStorage } from "../../utils/util";
import { AuthUser, User } from "../../models/user";
import { ProfileType } from "../../models/profile";
import { PasswordValues } from "../../models/password";
import { socket } from "../../utils/constants/constants";

const AuthContext = createContext<{
	authUser: AuthUser | null;
	userId: string | null;
	errorMsg: string | null;
	currentUser: User | null;
	followingUsers: User[];
	nonFollowingUsers: User[];
	isLoading: boolean;
	isSubmitting: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	setFollowingUsers: React.Dispatch<React.SetStateAction<User[]>>;
	setNonFollowingUsers: React.Dispatch<React.SetStateAction<User[]>>;
	authenticateUser: (
		data: { email: string; password: string; username?: string },
		isSignUp: boolean
	) => Promise<void>;
	handleUpdateUser: (data: Partial<ProfileType>) => Promise<User | void>;
	handleUpdatePassword: (data: PasswordValues) => Promise<string>;
	handleFollowUser: (id: string) => Promise<string>;
	handleUnFollowUser: (id: string) => Promise<string>;
	handleGetFollowingUsers: () => Promise<User[] | void>;
	logout: () => void;
	autoLogout: (milliseconds: number) => void;
	setUserId: React.Dispatch<React.SetStateAction<string | null>>;
	setAuthUser: (data: AuthUser | null) => void;
	setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
	authUser: {
		token: "",
		userId: "",
		expirationTimer: "",
		loggedInTime: "",
	},
	userId: null,
	errorMsg: null,
	currentUser: null,
	followingUsers: [],
	nonFollowingUsers: [],
	isLoading: false,
	isSubmitting: false,
	authenticateUser: async () => {},
	logout: () => {},
	autoLogout: () => {},
	handleUpdateUser: async () => Promise.resolve(),
	handleUpdatePassword: async () => Promise.resolve(""),
	handleFollowUser: async () => Promise.resolve(""),
	handleUnFollowUser: async () => Promise.resolve(""),
	handleGetFollowingUsers: async () => Promise.resolve(),
	setUserId: () => {},
	setAuthUser: () => {},
	setIsLoading: () => {},
	setIsSubmitting: () => {},
	setCurrentUser: () => {},
	setFollowingUsers: () => {},
	setNonFollowingUsers: () => {},
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
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [followingUsers, setFollowingUsers] = useState<User[]>([]);
	const [nonFollowingUsers, setNonFollowingUsers] = useState<User[]>([]);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const navigate = useNavigate();

	const authenticateUser = async (
		data: { email: string; password: string; username?: string },
		isSignUp: boolean
	) => {
		let resData;
		if (!isSignUp) {
			resData = await signIn(data);
		} else {
			if (data.username) {
				resData = await signUp({
					email: data.email,
					password: data.password,
					username: data.username,
				});
			}
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

	const handleUpdateUser = async (data: Partial<ProfileType>) => {
		const parsedUser = getDataFromLocalStorage();
		const extractedUser = await updateUser(
			parsedUser.userId,
			parsedUser.token,
			data
		);
		return extractedUser;
	};

	const handleUpdatePassword = async (data: PasswordValues) => {
		const parsedUser = getDataFromLocalStorage();
		return await updatePassword(parsedUser.token, data);
	};

	const handleFollowUser = async (id: string) => {
		const parsedUser = getDataFromLocalStorage();
		return await followUser(parsedUser.token, id);
	};

	const handleUnFollowUser = async (id: string) => {
		const parsedUser = getDataFromLocalStorage();
		return await unFollowUser(parsedUser.token, id);
	};

	const handleGetFollowingUsers = async () => {
		const parsedUser = getDataFromLocalStorage();
		return await getFollowing(parsedUser.userId, parsedUser.token);
	};

	const handleGetNonFollowingUsers = async () => {
		const parsedUser = getDataFromLocalStorage();
		return await getNonFollowing(parsedUser.token);
	};

	useEffect(() => {
		let submitTimer: NodeJS.Timeout;
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
			socket.connect();
			//socket.emit("addUser", authUser!.userId);
			//socket.on("getUsers", users => {
			//	console.log(users);
			//});
			setUserId(authUser.userId);
			getAuthUser(authUser.token).then(res => {
				setCurrentUser(res);

				handleGetFollowingUsers().then(users => {
					setFollowingUsers(users);
				});
				handleGetNonFollowingUsers().then(nonFollowing =>
					setNonFollowingUsers(nonFollowing)
				);
			});
		} else {
			setCurrentUser(null);
			socket.disconnect();

			setUserId(null);
			setFollowingUsers([]);
			navigate("/login", { replace: true });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authUser]);

	//useEffect(() => {
	//	if (socket.connected) {
	//		socket.emit("addUser", authUser!.userId);
	//		socket.on("getUsers", users => {
	//			console.log(users);
	//		});
	//	}
	//}, [authUser]);

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
		followingUsers,
		nonFollowingUsers,
		setNonFollowingUsers,
		setFollowingUsers,
		authenticateUser,
		logout,
		autoLogout,
		setUserId,
		handleUpdateUser,
		handleUpdatePassword,
		handleFollowUser,
		handleUnFollowUser,
		handleGetFollowingUsers,
		setAuthUser,
		setCurrentUser,
		setIsLoading,
		setIsSubmitting,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
