/** @format */

import React, { useEffect, useRef, useState } from "react";
import FriendBox from "./cosocial-box/FriendBox";
import UserBox from "./user-box/UserBox";
import classes from "./chatbox.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useChatCtx } from "../../context/ChatContext";
import { useAuth } from "../../hooks/auth/useAuth";
import { useParams } from "react-router-dom";
import { socket } from "../../utils/constants/constants";

const ChatBox = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { getConversation, chatWithUser } = useChatCtx();
	const { authUser } = useAuth();
	const { id } = useParams();
	const [chats, setChats] = useState<any[]>([]);
	const [text, setText] = useState("");
	const [isSent, setIsSent] = useState(false);

	const { userId } = authUser!;
	useEffect(() => {
		socket.emit("addUser", userId);
		socket.on("getUsers", users => {
			console.log(users);
		});
	}, [userId]);

	useEffect(() => {
		inputRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chats]);

	useEffect(() => {
		id &&
			getConversation(id).then((m: any) => {
				console.log(m);
				setChats(m.messages);
			});
	}, [id, isSent]);

	//useEffect(() => {

	//	if(setIsSent)
	//	id &&
	//		getConversation(id).then((m: any) => {
	//			console.log(m);
	//			setChats(m.messages);
	//		});
	//}, [id]);

	const sendText = async () => {
		setIsSent(false);
		if (id) {
			await chatWithUser({
				receiverId: id,
				senderId: authUser!.userId,
				text: text,
			});
			setIsSent(true);
			setText("");
		}
	};

	return (
		<div className={`${classes.container} w-7 h-7`}>
			<div
				className={`${classes.header} w-12 surface-500 p-2 text-3xl font-bold h-3rem`}
			>
				Chat
			</div>
			<ul className={classes["list"]}>
				{chats.map(m => {
					return (
						<li className="list-none" key={m._id}>
							{m.senderId === authUser?.userId && (
								<UserBox message={m.text} timeOfMessage={m.dateOfAction} />
							)}
							{m.senderId !== authUser?.userId && (
								<FriendBox message={m.text} timeOfMessage={m.dateOfAction} />
							)}
						</li>
					);
				})}
				{/*<li className="list-none">
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
				<li className="list-none">
					<UserBox />
				</li>
				<li className="list-none">
					<FriendBox />
				</li>*/}
			</ul>

			<div
				className={`"flex justify-content-end  gap-2 mb-2  align-item-end mr-2" ${classes["inputDiv"]}`}
			>
				<span className="p-input-icon-left">
					<i className="pi pi-pencil" />
					<InputText
						placeholder="Send a message"
						className="w-17rem"
						ref={inputRef}
						value={text}
						onChange={e => setText(e.target.value)}
					/>
				</span>
				<Button
					icon="pi pi-send"
					disabled={text === ""}
					onClick={sendText}
					className="mt-0"
				/>
			</div>
		</div>
	);
};

export default ChatBox;
