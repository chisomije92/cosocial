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
import { useSocketCtx } from "../../hooks/socket/useSocket";
//import { socket } from "../../utils/constants/constants";

const ChatBox = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const { socket } = useSocketCtx();
	const { getConversation, chatWithUser } = useChatCtx();
	const { authUser } = useAuth();
	const { id } = useParams();
	const [chats, setChats] = useState<any[]>([]);
	const [text, setText] = useState("");
	const [room, setRoom] = useState("");
	const [chatMembers, setChatMembers] = useState<any[]>([]);
	const [isSent, setIsSent] = useState(false);

	useEffect(() => {
		inputRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [chats]);

	useEffect(() => {
		if (chatMembers.length > 0 && room !== "") {
			socket?.emit("join_room", room);
		}
	}, [chatMembers, room]);

	//useEffect(() => {
	//	//if (
	//	//	isSent &&
	//	//	chatMembers.includes(authUser?.userId) &&
	//	//	chatMembers.includes(id)
	//	//) {
	//	socket.on("receiveMessage", data => {
	//		//console.log(data.room === room);
	//		//if (room === data.room) {
	//		//	//console.log("dont show messages");
	//		//	setChats(prev => prev.concat(data));
	//		//} else {
	//		//	setChats(prev => prev);
	//		//}
	//	});
	//	//}
	//}, [isSent]);

	//useEffect(() => {
	//	if (isSent) {
	//		console.log("Sent");
	//		socket.on("receiveMessage", data => {
	//			console.log(data);
	//			//console.log(data.messages);
	//			setChats(prev => prev.concat(data));
	//		});
	//	}
	//}, [isSent]);

	//useEffect(() => {
	//if (chatMembers.includes(id)) {
	//	console.log(chatMembers);
	//}
	//}, [chatMembers, id]);

	//useEffect(() => {
	//	socket.emit("usersAdd", authUser?.userId);
	//}, [authUser?.userId]);

	//useEffect(() => {
	//	socket.on("getUsers", data => {
	//		console.log(data);
	//	});
	//}, []);

	useEffect(() => {
		id &&
			getConversation(id).then((m: any) => {
				//console.log(m);
				setRoom(m._id);
				setChats(m.messages);
				setChatMembers(m.members);
			});
	}, [id]);

	useEffect(() => {
		if (isSent)
			//id &&
			//	getConversation(id).then((m: any) => {
			//		//console.log(m);
			//		setChats(m.messages);
			//	});

			socket?.on("messages", data => {
				if (data.action === "sendMessage") {
					//console.log("data");
					//setIsSent(true);
					id &&
						getConversation(id).then((m: any) => {
							//console.log(m);
							setChats(m.messages);
						});
					//console.log(data.messages);
					//setChats(data.messages);
				}
			});
	}, [id, isSent]);

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

			//console.log(chatMembers);
			//socket.on("messages", data => {
			//	if (data.action === "sendMessage") {
			//		//console.log("data");
			//		setIsSent(true);
			//		//console.log(data.messages);
			//		//setChats(data.messages);
			//	}
			//});

			//socket.emit("sendMessage", {
			//	receiverId: id,
			//	senderId: authUser!.userId,
			//	text: text,
			//	room: room,
			//});
			//socket.on("receiveMessage", data => {
			//	console.log(data);
			//	//console.log(data.messages);
			//	setChats(prev => [...prev, data]);
			//});
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
					onClick={() => onSendText()}
					className="mt-0"
				/>
			</div>
		</div>
	);
};

export default ChatBox;
