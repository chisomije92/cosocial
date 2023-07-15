/** @format */

import React from "react";
import ChatBox from "../../../components/chatbox/ChatBox";

import SideBar from "../../../components/side-bar/SideBar";
import { ChatProvider } from "../../../context/ChatContext";

const ChatPage = () => {
	return (
		<ChatProvider>
			<>
				<SideBar />
				<ChatBox />
			</>
		</ChatProvider>
	);
};

export default ChatPage;
