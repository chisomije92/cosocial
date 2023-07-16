/** @format */

import React from "react";
import { useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider } from "../../hooks/auth/useAuth";
import { PostProvider } from "../../context/PostContext";
import { SocketContextProvider } from "../../hooks/socket/useSocket";

export const AuthLayout = () => {
	const outlet = useOutlet();

	const authUser = useLoaderData() as any;
	return (
		<SocketContextProvider>
			<AuthProvider user={authUser}>
				<>
					<PostProvider>
						<>{outlet}</>
					</PostProvider>
				</>
			</AuthProvider>
		</SocketContextProvider>
	);
};
