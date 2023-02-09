/** @format */

import { Avatar } from "primereact/avatar";
import React from "react";
import classes from "./friendbox.module.css";

const FriendBox = () => {
	return (
		<div className={`flex flex-column align-items-end  ${classes.friendbox}`}>
			<div className="flex gap-2">
				<Avatar image="/assets/person/2.jpeg" shape="circle" size="large" />
				<p className="surface-300 px-1 border-1 border-200 border-round-md  text-lg">
					Hi! this is from Friend!
				</p>
			</div>
			<p className="font-light opacity-70 -mt-3">13 minutes ago</p>
		</div>
	);
};

export default FriendBox;
