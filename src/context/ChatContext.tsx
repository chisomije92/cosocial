/** @format */

import { createContext, useContext, useEffect, useState } from "react";
import { getDataFromLocalStorage } from "../utils/util";
import { chat, getChat, getChatUsers } from "../utils/chats-api";
import { ChatType } from "../models/chat";

const ChatContext = createContext<{
	getConversation: (id: string) => Promise<any>;
	chatWithUser: (data: ChatType) => Promise<any>;

	getUsersForChat: () => any;
}>({
	getConversation: async (id: string) => {},
	chatWithUser: async () => {},

	getUsersForChat: async () => {},
});

export const ChatProvider: React.FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const getConversation = async (userId: string) => {
		const parsedUser = getDataFromLocalStorage();
		const conversations = await getChat(parsedUser.token, userId);

		return conversations;
	};

	const chatWithUser = async (data: ChatType) => {
		const parsedUser = getDataFromLocalStorage();
		const conversations = await chat(parsedUser.token, data);
		return conversations;
	};

	const getUsersForChat = async () => {
		const parsedUser = getDataFromLocalStorage();
		const chatUsers = await getChatUsers(parsedUser.token);
		return chatUsers;
	};

	const value = {
		getConversation,
		chatWithUser,
		getUsersForChat,
	};

	return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatCtx = () => {
	return useContext(ChatContext);
};
