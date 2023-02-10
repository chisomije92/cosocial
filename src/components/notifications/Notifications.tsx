/** @format */

import React from "react";
import classes from "./notifications.module.css";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";

const Notifications = () => {
	return (
		<div className={`${classes.notifications} mr-3 mt-2 flex flex-column`}>
			<div className="ml-5">
				<h2 className="text-800">Notifications</h2>
			</div>
			<ul className="list-none">
				<li>
					<Card>
						<div className="flex justify-content-between">
							<p className=" text-800">
								<a href="#/" className="no-underline text-800">
									Chisom
								</a>{" "}
								liked your post
							</p>
							<div className="mt-3">
								<a href="#/" className="no-underline">
									View Post
								</a>
							</div>
						</div>
					</Card>
				</li>
				<li>
					<Card className="-mt-2 border-transparent">
						<div className="flex justify-content-between">
							<p className=" text-800">Chisom replied your post</p>
							<div className="mt-3">
								<a href="#/" className="no-underline">
									View Reply
								</a>
							</div>
						</div>
					</Card>
				</li>
				<li>
					<Card className="-mt-2 border-transparent">
						<div className="flex justify-content-between">
							<p className="ttext-800">Chisom followed you</p>
							<div className="mt-3">
								<a href="#/" className="no-underline">
									View Profile
								</a>
							</div>
						</div>
					</Card>
				</li>
			</ul>
		</div>
	);
};

export default Notifications;
