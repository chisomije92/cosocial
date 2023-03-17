/** @format */

import React, { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import Notifications from "../../components/notifications/Notifications";
import SearchFriend from "../../components/search-friend/SearchFriend";
import SideBar from "../../components/side-bar/SideBar";
import { getNotifications } from "../../utils/user-api";
import { getDataFromLocalStorage } from "../../utils/util";

const NotificationsPage = () => {
	const { data } = useLoaderData() as any;

	return (
		<>
			<Suspense fallback={<LoadingSpinner />}>
				<Await
					resolve={data}
					children={data => (
						<>
							<SideBar />
							<Notifications notifications={data.notifications} />
							<SearchFriend />
						</>
					)}
				/>
			</Suspense>
		</>
	);
};

const loadData = async () => {
	const parsedUser = getDataFromLocalStorage();
	const notifications = await getNotifications(parsedUser.token);
	return { notifications };
};

export const notificationsPageLoader = async () => {
	return defer({
		data: loadData(),
	});
};

export default NotificationsPage;
