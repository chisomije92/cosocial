/** @format */

import { Card } from "primereact/card";
import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import classes from "./error.module.css";

const Error = () => {
	const error = useRouteError();
	if (isRouteErrorResponse(error)) {
		return (
			<Card id="error-content" className={`${classes.error} surface-100`}>
				<h1 className="text-red-400">Oops!</h1>
				<h2 className="text-red-400">{error.status}</h2>
				<p className="text-red-300 font-bold">{error.statusText}</p>
				{error.data?.message && (
					<p className="text-red-300 font-bold">{error.data.message}</p>
				)}
			</Card>
		);
	} else {
		return (
			<Card id="error-content" className={`${classes.error} surface-100`}>
				<h1 className="text-red-400">Oops!</h1>
				<p className="text-red-300 font-bold">
					Sorry, an unexpected error has occurred.
				</p>
				{/*<Link to={"login"}>Login</Link>*/}
			</Card>
		);
	}
};

export default Error;
