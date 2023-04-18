/** @format */

import React, { useEffect, useRef } from "react";
import FriendBox from "./cosocial-box/FriendBox";
import UserBox from "./user-box/UserBox";
import classes from "./chatbox.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ChatBox = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		inputRef.current?.focus();
	});
	return (
		<div className={`${classes.container} w-7 h-7`}>
			<div
				className={`${classes.header} w-12 surface-500 p-2 text-3xl font-bold h-3rem`}
			>
				Chat
			</div>
			<ul>
				<li className="list-none">
					<FriendBox />
				</li>
				<li className="list-none">
					<UserBox />
				</li>
				<li className="list-none">
					<FriendBox />
				</li>
				<li className="list-none">
					<UserBox />
				</li>
				<li className="list-none">
					<FriendBox />
				</li>
			</ul>

			<div className="flex justify-content-end  gap-2 mb-2  align-item-end mr-2">
				<span className="p-input-icon-left">
					<i className="pi pi-pencil" />
					<InputText
						placeholder="Send a message"
						className="w-17rem"
						ref={inputRef}
					/>
				</span>
				<Button icon="pi pi-send" className="mt-0" />
			</div>
		</div>
	);
};

export default ChatBox;
