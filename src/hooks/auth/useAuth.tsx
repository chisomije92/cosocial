/** @format */

import React from "react";

import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

const AuthContext = createContext<{
	authUser: {
		token: string;
		userId: string;
		expirationTimer: string;
	} | null;
	login: (data: any) => Promise<void>;
	logout: () => void;
}>({
	authUser: {
		token: "",
		userId: "",
		expirationTimer: "",
	},
	login: async (data: boolean) => {},
	logout: () => {},
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
	const navigate = useNavigate();

	const login = async (data: { email: string; password: string }) => {
		setAuthUser({
			userId: "userId",
			token: "token",
			expirationTimer: new Date().toISOString(),
		});
		navigate("/", { replace: true });
	};

	const logout = () => {
		setAuthUser(null);
		navigate("/login", { replace: true });
	};

	const value = useMemo(
		() => ({
			authUser,
			login,
			logout,
		}),
		[authUser]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
