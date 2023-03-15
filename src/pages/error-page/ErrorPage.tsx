/** @format */

import React from "react";
import Error from "../../components/error/Error";
import NavBar from "../../components/nav-bar/NavBar";

const ErrorPage: React.FC<{}> = () => {
	return (
		<>
			<NavBar currentUser={{}} />
			<Error />
		</>
	);
};

export default ErrorPage;
