/** @format */

import React, { FC } from "react";
import classes from "./notifications.module.css";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { urlImgString } from "../../utils/constants/constants";
import ReactTimeAgo from "react-time-ago";

const Notifications: FC<{ notifications: any }> = ({ notifications }) => {
	return (
		<div className={`${classes.notifications} mx-auto  flex flex-column w-6`}>
			<ul className="list-none flex flex-column ">
				<li className="flex justify-content-between surface-200">
					<div className="text-2xl p-4 font-bold">Notifications</div>
					<div className="mt-4 mr-3">
						<Button
							label="Mark all as read"
							className="px-2 py-2 surface-200 text-primary font-semibold"
						/>
					</div>
				</li>
				{notifications.map((n: any) => (
					<li className="flex surface-400" key={n._id}>
						<>{console.log(n.actionUser)}</>
						<div className="flex my-auto ml-2">
							<i
								className={`pi pi-circle-fill  text-primary absolute -ml-2 -mt-1`}
								style={{ fontSize: "0.5rem", cursor: "pointer" }}
							></i>
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
									<Link
										to={
											n.actionPostId
												? `/post/${n.actionPostId}`
												: `/profile/${n.actionUser.userId}`
										}
										className="no-underline text-primary"
									>
										{n.actions}
									</Link>{" "}
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
