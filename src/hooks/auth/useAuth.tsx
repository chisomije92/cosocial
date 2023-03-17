/** @format */

import React, { useEffect, useState } from "react";

import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { getAuthUser, signIn, signUp } from "../../utils/user-api";

const AuthContext = createContext<{
	authUser: {
		token: string;
		userId: string;
		expirationTimer: string;
	} | null;
	userId: string | null;
	errorMsg: string | null;
	currentUser: any;
	authenticateUser: (data: any, isSignUp: boolean) => Promise<void>;
	logout: () => void;
	autoLogout: (milliseconds: number) => void;
	setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
	authUser: {
		token: "",
		userId: "",
		expirationTimer: "",
	},
	userId: null,
	errorMsg: null,
	currentUser: null,
	authenticateUser: async () => {},
	logout: () => {},
	autoLogout: () => {},

	setUserId: () => {},
});

export const AuthProvider: React.FC<{
	children: JSX.Element;
	user: {
		token: string;
		userId: string;
		expirationTimer: string;
	};
}> = ({ children, user }) => {
	const [authUser, setAuthUser] = useLocalStorage<{
		token: string;
		userId: string;
		expirationTimer: string;
	} | null>("authUser", user);
	const [userId, setUserId] = useState<string | null>(null);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [currentUser, setCurrentUser] = useState<any>();
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
		const remainingMilliseconds = 60 * 60 * 1000;
		const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
		console.log(expiryDate);

		if (resData?.userId) {
			setAuthUser({
				userId: resData.userId,
				token: resData.token,
				expirationTimer: expiryDate.toISOString(),
			});
		}
	};

	const logout = () => {
		setAuthUser(null);
		setUserId(null);
	};

	const autoLogout = (milliseconds: number) => {
		setTimeout(() => {
			logout();
		}, milliseconds);
	};

	useEffect(() => {
		if (authUser?.userId) {
			setUserId(authUser.userId);
			const expirationDuration =
				new Date(authUser.expirationTimer).getTime() - new Date().getTime();
			autoLogout(expirationDuration);
			getAuthUser(authUser.token, authUser.userId).then(res => {
				setCurrentUser(res);
			});
		} else {
			setCurrentUser(null);
			setUserId(null);
			navigate("/login", { replace: true });
		}
	}, [authUser]);

	//useEffect(() => {
	//	if (authUser === undefined) {
	//		//setCurrentUser(null);
	//		//setUserId(null);
	//		navigate("/login", { replace: true });
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
		authenticateUser,
		logout,
		autoLogout,
		setUserId,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
