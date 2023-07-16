/** @format */

import { DefaultEventsMap } from "@socket.io/component-emitter";
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { socketUrl } from "../../utils/constants/constants";
import { getDataFromLocalStorage } from "../../utils/util";

const SocketContext = createContext<{
	socket: Socket<DefaultEventsMap, DefaultEventsMap> | undefined;
	setSocket: Dispatch<
		SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | undefined>
	>;
}>({
	socket: {} as Socket<DefaultEventsMap, DefaultEventsMap> | undefined,
	setSocket: () => null,
});

export const SocketContextProvider: React.FC<{
	children: JSX.Element;
}> = ({ children }) => {
	const [socket, setSocket] =
		useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

	//const userId = getDataFromLocalStorage()?.userId;

	//useEffect(() => {
	//setSocket(
	//	io(socketUrl, {
	//		//autoConnect: true
	//		auth: {
	//			userId: userId ? userId : null,
	//		},
	//	})
	//);
	//}, [userId]);

	const value = {
		socket,
		setSocket,
	};

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};

export const useSocketCtx = () => {
	return useContext(SocketContext);
};
