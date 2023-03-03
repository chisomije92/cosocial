/** @format */

import React, { Suspense } from "react";
import { Await, useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../../hooks/auth/useAuth";
import { ProgressBar } from "primereact/progressbar";

export const AuthLayout = () => {
	const outlet = useOutlet();
	const { isAuthenticated } = useAuth();

	const authPromise = useLoaderData();

	return (
		<Suspense
			fallback={
				<ProgressBar
					mode="indeterminate"
					style={{ height: "6px" }}
				></ProgressBar>
			}
		>
			<Await
				resolve={authPromise}
				children={user => (
					<AuthProvider isAuth={isAuthenticated}>
						<>{outlet}</>
					</AuthProvider>
				)}
			/>
		</Suspense>
	);
};
