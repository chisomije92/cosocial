/** @format */

import React from "react";
import Notifications from "../../components/notifications/Notifications";
import SearchFriend from "../../components/search-friend/SearchFriend";
import SideBar from "../../components/side-bar/SideBar";

const NotificationsPage = () => {
	return (
		<>
			<SideBar />
			<Notifications />
			<SearchFriend />
		</>
	);
};

export default NotificationsPage;
