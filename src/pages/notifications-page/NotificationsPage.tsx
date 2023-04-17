/** @format */

import Notifications from "../../components/notifications/Notifications";
import SearchFriend from "../../components/search-friend/SearchFriend";
import SideBar from "../../components/side-bar/SideBar";
import { NotificationProvider } from "../../context/NotificationContext";
import { useAuth } from "../../hooks/auth/useAuth";

const NotificationsPage = () => {
	const { setCurrentUser } = useAuth();
	return (
		<NotificationProvider setCurrentUser={setCurrentUser}>
			<>
				<SideBar />
				<Notifications />
				<SearchFriend />
			</>
		</NotificationProvider>
	);
};

export default NotificationsPage;
