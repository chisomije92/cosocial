/** @format */

import { createContext, useContext } from "react";
import {
	deleteSingleNotification,
	getAuthUser,
	readAllNotifications,
	readNotification,
	unreadAllNotifications,
} from "../utils/user-api";
import { getDataFromLocalStorage } from "../utils/util";

const NotificationContext = createContext<{
	changeNotificationStatus: (id: string) => void;
	changeAllNotificationStatus: () => void;
	changeNotificationsToUnread: () => void;
	handleDeleteSingleNotification: (notifId: string) => Promise<any>;
}>({
	changeNotificationStatus: async (id: string) => {},
	changeAllNotificationStatus: () => {},
	changeNotificationsToUnread: () => {},
	handleDeleteSingleNotification: async () => Promise.resolve([]),
});

export const NotificationProvider: React.FC<{
	children: JSX.Element;
	setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
}> = ({ children, setCurrentUser }) => {
	const handleDeleteSingleNotification = async (notifId: string) => {
		const parsedUser = getDataFromLocalStorage();
		const filteredNotifications = await deleteSingleNotification(
			parsedUser.token,
			notifId
		);
		return filteredNotifications;
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

	const value = {
		changeAllNotificationStatus,
		changeNotificationStatus,
		changeNotificationsToUnread,
		handleDeleteSingleNotification,
	};
	return (
		<NotificationContext.Provider value={value}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotifCtx = () => {
	return useContext(NotificationContext);
};
