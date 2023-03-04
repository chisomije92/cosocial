/** @format */

import React, { Suspense } from "react";
import { Await, useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../../hooks/auth/useAuth";
import { ProgressBar } from "primereact/progressbar";

export const AuthLayout = () => {
	const outlet = useOutlet();
	const { isAuthenticated } = useAuth();

	return (
		<AuthProvider isAuth={isAuthenticated}>
			<>{outlet}</>
		</AuthProvider>
	);
};
