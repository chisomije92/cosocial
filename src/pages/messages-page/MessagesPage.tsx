/** @format */

import React from "react";

import Messages from "../../components/messages/Messages";

import SideBar from "../../components/side-bar/SideBar";
import { ChatProvider } from "../../context/ChatContext";

const MessagesPage = () => {
	return (
		<ChatProvider>
			<>
				<SideBar />
				<Messages />
			</>
		</ChatProvider>
	);
};

export default MessagesPage;
