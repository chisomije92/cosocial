/** @format */

import { DefaultEventsMap } from "@socket.io/component-emitter";
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";
import { Socket } from "socket.io-client";

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
