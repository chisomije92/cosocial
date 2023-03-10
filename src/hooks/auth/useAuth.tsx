/** @format */

import React, { useEffect, useState } from "react";

import { createContext, useContext, useMemo } from "react";
import { redirect, useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { signIn } from "../../utils/api";

const AuthContext = createContext<{
	authUser: {
		token: string;
		userId: string;
		expirationTimer: string;
	} | null;
	login: (data: any) => Promise<void>;
	logout: () => void;
	autoLogout: (milliseconds: number) => void;
	userId: string | null;
	setUserId: React.Dispatch<React.SetStateAction<string | null>>;
}>({
	authUser: {
		token: "",
		userId: "",
		expirationTimer: "",
	},
	login: async (data: boolean) => {},
	logout: () => {},
	autoLogout: (milliseconds: number) => {},
	userId: null,
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
	const navigate = useNavigate();

	const login = async (data: { email: string; password: string }) => {
		const resData = await signIn(data);
		const remainingMilliseconds = 60 * 60 * 1000;
		const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
		setAuthUser({
			userId: resData.userId,
			token: resData.token,
			expirationTimer: expiryDate.toISOString(),
		});

		autoLogout(remainingMilliseconds);
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
		if (authUser) {
			setUserId(authUser.userId);
		} else {
			setUserId(null);
			navigate("/login", { replace: true });
		}
	}, [authUser]);

	const value = {
		authUser,
		login,
		logout,
		autoLogout,
		userId,
		setUserId,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
