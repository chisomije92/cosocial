/** @format */

import React, { Suspense } from "react";
import { Await, useLoaderData, useOutlet } from "react-router-dom";
import { AuthProvider, useAuth } from "../../hooks/auth/useAuth";
import { ProgressBar } from "primereact/progressbar";

export const AuthLayout = () => {
	const outlet = useOutlet();

	//const { authUser } = useLoaderData() as any;
	const authUser = useLoaderData() as any;
	//console.log(authUser);
	return (
		//<Suspense fallback={<p>Loading</p>}>
		//	<Await
		//		resolve={authUser}
		//		children={data => (
		//			<>
		//				<AuthProvider user={data}>
		//					<>{outlet}</>
		//				</AuthProvider>
		//				;
		//			</>
		//		)}
		//	/>
		//</Suspense>
		<AuthProvider user={authUser}>
			<>{outlet}</>
		</AuthProvider>
	);
};
