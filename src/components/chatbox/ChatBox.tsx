/** @format */

import { Card } from "primereact/card";
import React from "react";
import FriendBox from "./cosocial-box/FriendBox";
import UserBox from "./user-box/UserBox";
import classes from "./chatbox.module.css";

const ChatBox = () => {
	return (
		<div className={`${classes.container} mt-4`}>
			<Card title="Chat">
				<FriendBox />
				<UserBox />
			</Card>
		</div>
	);
};

export default ChatBox;
