/** @format */

import React from "react";
import Error from "../../components/error/Error";
import NavBar from "../../components/nav-bar/NavBar";

const ErrorPage: React.FC<{
	onSignOut: () => void;
}> = ({ onSignOut }) => {
	return (
		<>
			<NavBar onSignOut={onSignOut} />
			<Error />
		</>
	);
};

export default ErrorPage;
