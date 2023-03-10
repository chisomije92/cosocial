/** @format */

import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";
import classes from "./loading-spinner.module.css";

const LoadingSpinner = () => {
	return (
		<div className={`${classes.container}`}>
			<ProgressSpinner
				style={{ width: "120px", height: "120px" }}
				className=""
				strokeWidth="8"
				fill="var(--surface-ground)"
				animationDuration=".5s"
			/>
		</div>
	);
};

export default LoadingSpinner;
