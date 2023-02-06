/** @format */

import React from "react";
import Share from "../share/Share";
import classes from "./feeds.module.css";

export default function Feeds() {
	return (
		<div className={`${classes.feeds}`}>
			<div className="p-4">
				<Share />
			</div>
		</div>
	);
}
