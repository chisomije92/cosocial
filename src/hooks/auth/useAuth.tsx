/** @format */

import React, { useEffect, useState } from "react";

import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import {
	getAuthUser,
	signIn,
	signUp,
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
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	authenticateUser: (data: any, isSignUp: boolean) => Promise<void>;
	handleUpdateUser: (data: any) => Promise<any>;
	handleUpdatePassword: (data: any) => Promise<any>;
	logout: () => void;
	autoLogout: (milliseconds: number) => void;
	setUserId: React.Dispatch<React.SetStateAction<string | null>>;
	setAuthUser: (data: any) => void;
	setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
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
	isLoading: false,
	isSubmitting: false,
	authenticateUser: async () => {},
	logout: () => {},
	autoLogout: () => {},
	handleUpdateUser: async () => Promise.resolve(""),
	handleUpdatePassword: async () => Promise.resolve(""),
	setUserId: () => {},
	setAuthUser: () => {},
	setIsLoading: () => {},
	setIsSubmitting: () => {},
	setCurrentUser: () => {},
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
		authenticateUser,
		logout,
		autoLogout,
		setUserId,
		handleUpdateUser,
		handleUpdatePassword,
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
