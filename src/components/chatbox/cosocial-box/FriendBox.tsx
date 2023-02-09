/** @format */

import { Avatar } from "primereact/avatar";
import React from "react";
import classes from "./friendbox.module.css";

const FriendBox = () => {
	return (
		<div className={`flex gap-1 align-self-start ${classes.friendbox}`}>
			<Avatar image="/assets/person/1.jpeg" size="large" shape="circle" />
			<p className="surface-300 px-1 border-1 border-200 border-round-md  text-lg">
				Hi! this is from Friend!
			</p>
		</div>
	);
};

export default FriendBox;
