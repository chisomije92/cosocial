/** @format */

import React from "react";
import classes from "./notifications.module.css";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { urlImgString } from "../../utils/constants/constants";
import ReactTimeAgo from "react-time-ago";
import { useAuth } from "../../hooks/auth/useAuth";
import { sortData } from "../../utils/util";

const Notifications = () => {
	const {
		changeNotificationStatus,
		changeAllNotificationStatus,
		changeNotificationsToUnread,
		currentUser,
	} = useAuth();
	const [notifsRead, setNotifsRead] = React.useState<boolean>(false);
	const navigate = useNavigate();
	return (
		<div className={`${classes.notifications} mx-auto  flex flex-column w-6`}>
			<ul className="list-none flex flex-column ">
				<li className="flex justify-content-between surface-200">
					<div className="text-2xl p-4 font-bold">Notifications</div>
					<div className="mt-4 mr-3">
						<Button
							label={`Mark all as ${notifsRead ? "read" : "unread"}`}
							className="px-2 py-2 surface-200 text-primary font-semibold"
							onClick={() => {
								if (notifsRead) {
									setNotifsRead(false);
									changeAllNotificationStatus();
								} else {
									setNotifsRead(true);
									changeNotificationsToUnread();
								}
							}}
						/>
					</div>
				</li>
				{currentUser &&
					sortData(currentUser.notifications, "dateOfAction").map((n: any) => (
						<li
							className={`flex ${!n.read ? "surface-400" : "surface-200"} `}
							key={n._id}
						>
							<div className="flex my-auto ml-2">
								{!n.read && (
									<i
										className={`pi pi-circle-fill  text-primary absolute -ml-2 -mt-1`}
										style={{ fontSize: "0.5rem", cursor: "pointer" }}
									></i>
								)}
							</div>

							<div className="flex gap-2 p-2">
								<Avatar
									shape="circle"
									size="large"
									image={`${urlImgString}${n.actionUser.profilePicture}`}
								/>
								<div>
									<div className="font-semibold">{n.actionUser.username}</div>
									<div className="mt-1">
										{/*<Link
										to={
											n.actionPostId
												? `/post/${n.actionPostId}`
												: `/profile/${n.actionUser.userId}`
										}
										className="no-underline text-primary"
									>
										{n.actions}
									</Link>*/}
										<span
											className="no-underline text-primary cursor-pointer"
											onClick={() => {
												changeNotificationStatus(n._id);
												navigate(
													n.actionPostId
														? `/post/${n.actionPostId}`
														: `/profile/${n.actionUser.userId}`
												);
											}}
										>
											{n.actions}
										</span>
									</div>
								</div>
							</div>
							<div className={`${classes.timeContainer}`}>
								<div className="opacity-70">
									{
										<ReactTimeAgo
											date={new Date(n.dateOfAction)}
											locale="en-US"
										/>
									}
								</div>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default Notifications;
