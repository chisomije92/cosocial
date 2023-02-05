/** @format */

import React from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./LightTheme.css";
//import "primereact/resources/themes/vela-blue/theme.css";
//import "primereact/resources/themes/";

const LightTheme: React.FC<{ children: JSX.Element; className?: string }> = ({
	children,
	className,
}) => {
	return <main className={`${className} ${"theme-light"}`}>{children}</main>;
};

export default LightTheme;
