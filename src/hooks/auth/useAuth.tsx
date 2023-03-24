/** @format */

import React, { useEffect, useState } from "react";

import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "use-local-storage";
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
	} | null;
	userId: string | null;
	errorMsg: string | null;
	currentUser: any;
	changeNotificationStatus: (id: string) => void;
	changeAllNotificationStatus: () => void;
	changeNotificationsToUnread: () => void;
	authenticateUser: (data: any, isSignUp: boolean) => Promise<void>;
	logout: () => void;
	autoLogout: (milliseconds: number) => void;
	setUserId: React.Dispatch<React.SetStateAction<string | null>>;
	setAuthUser: (data: any) => void;
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
	changeNotificationStatus: async (id: string) => {},
	changeAllNotificationStatus: () => {},
	changeNotificationsToUnread: () => {},
	setUserId: () => {},
	setAuthUser: () => {},
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
		//if (authUser) {
		//const dateTimer = addMinutes(authUser.expirationTimer, 15);
		//setAuthUser({
		//	...authUser,
		//	expirationTimer: dateTimer.toISOString(),
		//});
		//}

		setCurrentUser(user);
	};

	const authUserId = authUser && authUser.userId;
	const authUserExpTimer = authUser && authUser.expirationTimer;
	const authUserToken = authUser && authUser.token;
	const parsedUser = getDataFromLocalStorage();
	//console.log(parsedUser.expirationTimer);
	//useEffect(() => {
	//	if (authUserId && authUserExpTimer && authUserToken) {
	//		setUserId(authUserId);
	//		//const dateTimer = addMinutes(authUser.expirationTimer, 15);
	//		//setAuthUser({
	//		//	...authUser,
	//		//	expirationTimer: dateTimer.toISOString(),
	//		//});
	//		getAuthUser(authUserToken).then(res => {
	//			setCurrentUser(res);
	//			console.log(authUserExpTimer);
	//			//console.log(parsedUser.expirationTimer);
	//			const expirationDuration =
	//				new Date(authUserExpTimer).getTime() - new Date().getTime();
	//			autoLogout(expirationDuration);
	//			//const dateTimer = addMinutes(authUser.expirationTimer, 15);
	//			//setAuthUser({
	//			//	...authUser,
	//			//	expirationTimer: dateTimer.toISOString(),
	//			//});
	//		});
	//	} else {
	//		setCurrentUser(null);
	//		setUserId(null);
	//		navigate("/login", { replace: true });
	//	}
	//}, [authUserId, authUserExpTimer, authUserToken]);
	useEffect(() => {
		if (authUser && (authUser.userId || parsedUser.expirationTimer)) {
			setUserId(authUserId);
			//const dateTimer = addMinutes(authUser.expirationTimer, 15);
			//setAuthUser({
			//	...authUser,
			//	expirationTimer: dateTimer.toISOString(),
			//});
			getAuthUser(authUser.token).then(res => {
				setCurrentUser(res);
				console.log(authUser.expirationTimer);
				//console.log(parsedUser.expirationTimer);
				const expirationDuration =
					new Date(authUser.expirationTimer).getTime() - new Date().getTime();
				autoLogout(expirationDuration);
				//const dateTimer = addMinutes(authUser.expirationTimer, 15);
				//setAuthUser({
				//	...authUser,
				//	expirationTimer: dateTimer.toISOString(),
				//});
			});
		} else {
			setCurrentUser(null);
			setUserId(null);
			navigate("/login", { replace: true });
		}
	}, [parsedUser.expirationTimer, authUser]);

	//useEffect(() => {
	//	if (parsedUser) {
	//		console.log(parsedUser.expirationTimer);
	//	}
	//}, [parsedUser]);

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
		changeNotificationStatus,
		changeAllNotificationStatus,
		changeNotificationsToUnread,
		setAuthUser,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	return useContext(AuthContext);
};
