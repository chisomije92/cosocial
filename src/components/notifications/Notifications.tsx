/** @format */

import React from "react";
import classes from "./notifications.module.css";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const Notifications = () => {
	return (
		<div className={`${classes.notifications} mx-auto  flex flex-column w-6`}>
			<ul className="list-none flex flex-column ">
				<li className="flex justify-content-between surface-200">
					<div className="text-2xl p-4 font-bold">Notifications</div>
					<div className="mt-4 mr-3">
						<Button
							label="Mark all as read"
							className="px-2 py-2 surface-100 text-primary font-semibold"
						/>
					</div>
				</li>
				<li className="flex surface-400">
					<div className="flex my-auto ml-2">
						<i
							className={`pi pi-circle-fill  text-primary absolute -ml-2 -mt-1`}
							style={{ fontSize: "0.5rem", cursor: "pointer" }}
						></i>
					</div>

					<div className="flex gap-2 p-2">
						<Avatar shape="circle" size="large" image="/assets/person/4.jpeg" />
						<div>
							<div className="font-semibold">Chisom</div>
							<div className="mt-1">
								<Link to="/post/1" className="no-underline text-primary">
									Liked your post
								</Link>{" "}
							</div>
						</div>
					</div>
					<div className={`${classes.timeContainer}`}>
						<div className="opacity-70">5 minutes ago</div>
					</div>
				</li>
				<li className="flex surface-100">
					<div className="flex my-auto ml-2">
						<i
							className={`pi pi-circle-fill  text-color-secondary absolute -ml-2 -mt-1`}
							style={{ fontSize: "0.5rem", cursor: "pointer" }}
						></i>
					</div>
					<div className="flex gap-2 p-2">
						<Avatar shape="circle" size="large" image="/assets/person/4.jpeg" />
						<div>
							<div className="font-semibold">Chisom</div>
							<div className="mt-1">
								<Link to="/post/1" className="no-underline text-primary">
									Liked your post
								</Link>{" "}
							</div>
						</div>
					</div>
					<div className={`${classes.timeContainer}`}>
						<div className="opacity-70">5 minutes ago</div>
					</div>
				</li>
				<li className="flex surface-100">
					<div className="flex my-auto ml-2">
						<i
							className={`pi pi-circle-fill  text-color-secondary absolute -ml-2 -mt-1`}
							style={{ fontSize: "0.5rem", cursor: "pointer" }}
						></i>
					</div>
					<div className="flex gap-2 p-2">
						<Avatar shape="circle" size="large" image="/assets/person/4.jpeg" />
						<div>
							<div className="font-semibold">Chisom</div>
							<div className="mt-1">
								<Link to="/profile" className="no-underline text-primary">
									followed you
								</Link>{" "}
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
