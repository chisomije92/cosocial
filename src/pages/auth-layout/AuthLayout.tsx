/** @format */

import React from "react";
import { useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider } from "../../hooks/auth/useAuth";
import { PostProvider } from "../../context/PostContext";

export const AuthLayout = () => {
	const outlet = useOutlet();

	const authUser = useLoaderData() as any;
	return (
		<AuthProvider user={authUser}>
			<>
				<PostProvider>
					<>{outlet}</>
				</PostProvider>
			</>
		</AuthProvider>
	);
};
