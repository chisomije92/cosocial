/** @format */

import React, { Suspense } from "react";
import { Await, useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../../hooks/auth/useAuth";
import { ProgressBar } from "primereact/progressbar";

export const AuthLayout = () => {
	const outlet = useOutlet();
	const user = useLoaderData() as any;

	return (
		<AuthProvider user={user}>
			<>{outlet}</>
		</AuthProvider>
	);
};
