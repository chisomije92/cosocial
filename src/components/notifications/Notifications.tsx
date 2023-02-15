/** @format */

import React from "react";
import classes from "./notifications.module.css";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

const Notifications = () => {
	return (
		<div
			className={`${classes.notifications} md:ml-auto ml-8  flex flex-column`}
		>
			<ul className="list-none ">
				<li className="flex justify-content-between">
					<div className="text-2xl p-4 font-bold">Notifications</div>
					<div className="mt-4 mr-3">
						<Button
							label="Mark all as read"
							className="px-2 py-2 surface-100 text-primary font-semibold"
						/>
					</div>
				</li>
				<li className="flex">
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
					<div className={`${classes.timeContainer}`}>
						<div className="opacity-70">5 minutes ago</div>
					</div>
				</li>
				<li className="flex">
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
					<div className={`${classes.timeContainer}`}>
						<div className="opacity-70">5 minutes ago</div>
					</div>
				</li>
				<li className="flex">
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
					<div className={`${classes.timeContainer}`}>
						<div className="opacity-80">5 minutes ago</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Notifications;
