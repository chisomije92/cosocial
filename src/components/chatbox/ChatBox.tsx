/** @format */

import { Card } from "primereact/card";
import React from "react";
import FriendBox from "./cosocial-box/FriendBox";
import UserBox from "./user-box/UserBox";
import classes from "./chatbox.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ChatBox = () => {
	return (
		<div className={`${classes.container} mt-4  xl:-ml-5 ml-0`}>
			<Card title="Chat">
				<FriendBox />
				<UserBox />
				<div className="flex justify-content-evenly flex-column xl:flex-row">
					<span className="p-input-icon-left">
						<i
							className="pi pi-pencil 
"
						/>
						<InputText placeholder="Send a message" className="w-12" />
					</span>
					<Button icon="pi pi-send" className="mt-2 xl:mt-0" />
				</div>
			</Card>
		</div>
	);
};

export default ChatBox;
