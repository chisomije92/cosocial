/** @format */

import React, { useEffect, useRef, useState } from "react";
import FriendBox from "./cosocial-box/FriendBox";
import UserBox from "./user-box/UserBox";
import classes from "./chatbox.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useChatCtx } from "../../context/ChatContext";
import { useAuth } from "../../hooks/auth/useAuth";
import { Link, useParams } from "react-router-dom";
import { useSocketCtx } from "../../hooks/socket/useSocket";

const ChatBox = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { socket } = useSocketCtx();
	const { getConversation, chatWithUser, getOneChatUser } = useChatCtx();
	const { authUser, currentUser } = useAuth();
	const { id } = useParams();
	const [chats, setChats] = useState<any[]>([]);
	const [text, setText] = useState("");
	const [chatUser, setChatUser] = useState<any>();

	const [isSent, setIsSent] = useState(false);

	useEffect(() => {
		inputRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chats]);

	useEffect(() => {
		id &&
			getConversation(id).then((m: any) => {
				m && setChats(m.messages);
			});
		id &&
			getOneChatUser(id).then((user: any) => {
				setChatUser(user);
			});
	}, [id]);

	useEffect(() => {
		if (isSent) {
			socket?.on("messages", data => {
				if (data.action === "sendMessage") {
					id &&
						getConversation(id).then((m: any) => {
							m && setChats(m.messages);
						});
				}
			});
		}
	}, [id, isSent, socket]);

	const onSendText = () => {
		setIsSent(false);
		if (id) {
			const messageData = {
				receiverId: id,
				senderId: authUser!.userId,
				text: text,
			};
			chatWithUser(messageData);
			setIsSent(true);
			setText("");
		}
	};

	return (
		<div className={`${classes.container} w-7 h-7`}>
			<div
				className={`${classes.header} w-12 surface-500 p-2 text-2xl font-bold h-3rem`}
			>
				<Link to="/messages" className={classes["back-link"]}>
					<i className="pi pi-arrow-left" style={{ fontSize: "1.3rem" }}></i>
				</Link>
				<span>{`Chat with ${
					!chatUser?.username ? "" : chatUser.username
				}`}</span>
			</div>

			<ul className={classes["list"]}>
				{chats.map(m => {
					return (
						<li className="list-none" key={m._id}>
							{m.senderId === authUser?.userId && (
								<UserBox
									userImage={
										!currentUser?.profilePicture
											? "images/transparent-avatar.png"
											: currentUser?.profilePicture
									}
									message={m.text}
									timeOfMessage={m.dateOfAction}
								/>
							)}
							{m.senderId !== authUser?.userId && (
								<FriendBox
									userImage={
										!chatUser?.profilePicture
											? "images/transparent-avatar.png"
											: chatUser?.profilePicture
									}
									message={m.text}
									timeOfMessage={m.dateOfAction}
								/>
							)}
						</li>
					);
				})}
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
					onClick={() => onSendText()}
					className="mt-0"
				/>
			</div>
		</div>
	);
};

export default ChatBox;
