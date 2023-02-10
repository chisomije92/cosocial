/** @format */

import { Card } from "primereact/card";
import React from "react";
import FriendBox from "./cosocial-box/FriendBox";
import UserBox from "./user-box/UserBox";
import classes from "./chatbox.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import { Panel } from "primereact/panel";

const ChatBox = () => {
	return (
		<ScrollPanel
			style={{ height: "450px" }}
			className={`${classes.container} mt-2 mr-3 align-item-end`}
		>
			<Panel header="Chat" className="-mr-3">
				<FriendBox />
				<UserBox />
				<FriendBox />
				<UserBox />
				<div className="flex justify-content-end flex-column xl:flex-row gap-2 mt-2 align-item-end">
					<span className="p-input-icon-left">
						<i className="pi pi-pencil" />
						<InputText placeholder="Send a message" className="w-17rem pr" />
					</span>
					<Button icon="pi pi-send" className="mt-2 xl:mt-0" />
				</div>
			</Panel>
		</ScrollPanel>
	);
};

export default ChatBox;
