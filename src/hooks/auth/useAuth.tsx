/** @format */

import React from "react";

import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";

const AuthContext = createContext<{
	isAuthenticated: boolean;
	login: (data: boolean) => Promise<void>;
	logout: () => void;
}>({
	isAuthenticated: false,
	login: async (data: boolean) => {},
	logout: () => {},
});

export const AuthProvider: React.FC<{
	children: JSX.Element;
	isAuth: boolean;
}> = ({ children, isAuth }) => {
	const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>(
		"isAuth",
		isAuth
	);
	const navigate = useNavigate();
	const login = async (data: boolean) => {
		setIsAuthenticated(data);
		navigate("/", { replace: true });
	};

	const logout = () => {
		setIsAuthenticated(false);
		navigate("/login", { replace: true });
	};

	const value = useMemo(
		() => ({
			isAuthenticated,
			login,
			logout,
		}),
		[isAuthenticated]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
