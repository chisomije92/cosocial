/** @format */

import React from "react";
import classes from "./notifications.module.css";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";

const Notifications = () => {
	return (
		<div className={`${classes.notifications} mr-3 mt-2 flex flex-column`}>
			<ul className="list-none ">
				<li className="flex justify-content-between">
					<div className="text-2xl p-4 font-bold">Notifications</div>
					<div className="mt-4 mr-3">
						<a href="#/" className="no-underline text-primary font-semibold">
							Mark all as read
						</a>
					</div>
				</li>
				<li className="">
					<div className="flex gap-2 p-2">
						<Avatar shape="circle" size="large" image="/assets/person/4.jpeg" />
						<div>
							<div className="font-semibold">Chisom</div>
							<div className="mt-1">
								<a href="#/" className="no-underline text-primary">
									Liked your post
								</a>{" "}
							</div>
						</div>
					</div>
					<div className={`${classes.timeContainer} hidden md:block`}>
						<div className="opacity-70">5 minutes ago</div>
					</div>
				</li>
				<li className="">
					<div className="flex gap-2 p-2">
						<Avatar shape="circle" size="large" image="/assets/person/4.jpeg" />
						<div>
							<div className="font-semibold">Chisom</div>
							<div className="mt-1">
								<a href="#/" className="no-underline text-primary">
									Liked your post
								</a>{" "}
							</div>
						</div>
					</div>
					<div className={`${classes.timeContainer} hidden md:block`}>
						<div className="opacity-70">5 minutes ago</div>
					</div>
				</li>
				<li className="">
					<div className="flex gap-2 p-2">
						<Avatar shape="circle" size="large" image="/assets/person/4.jpeg" />
						<div>
							<div className="font-semibold">Chisom</div>
							<div className="mt-1">
								<a href="#/" className="no-underline text-primary">
									followed you
								</a>{" "}
							</div>
						</div>
					</div>
					<div className={`${classes.timeContainer} hidden md:block`}>
						<div className="opacity-80">5 minutes ago</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Notifications;
