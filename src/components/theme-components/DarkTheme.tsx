/** @format */

import React from "react";
//import "primereact/resources/themes/arya-blue/theme.css";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
import "./DarkTheme.css";

const DarkTheme: React.FC<{ children: JSX.Element; className?: string }> = ({
	children,
	className,
}) => {
	return <main className={className}>{children}</main>;
};

export default DarkTheme;
