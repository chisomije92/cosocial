/** @format */

import React, { FC, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NavBar from "../nav-bar/NavBar";

const ProtectedRoute: FC<{
	isSignedIn?: boolean;
	children: JSX.Element;
}> = ({ children, isSignedIn }) => {
	//const signedIn = localStorage.getItem("isSignedIn");
	//const [isSignedIn, setIsSignedIn] = useState<string | null>(signedIn);
	//const navigate = useNavigate();
	//if (signedIn) {
	//	return <Navigate to="/login" replace />;
	//}
	//useEffect(() => {
	//	console.log(signedIn);
	//	//if (signedIn) {
	//	setIsSignedIn(signedIn);
	//	console.log(signedIn);
	//	//}
	//}, [signedIn]);
	return (
		<>
			{/*<NavBar />*/}
			{!isSignedIn && <Navigate to="/login" replace />}
			{isSignedIn && children}
		</>
	);
};

export default ProtectedRoute;
