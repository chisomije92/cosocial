/** @format */

import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import classes from "./NavBar.module.css";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import headshot from "../../images/headshot.jpg";
import cosocialImg from "../../images/CO-1.png";
//import "./NavBar.css";

export default function NavBar() {
	const items = [
		{
			template: (
				<div className={`${classes.inputSearch}`}>
					<span className="p-input-icon-left">
						<i className="pi pi-search" />
						<InputText
							placeholder="Search"
							//className="inputSearch"
							//className={classes.inputSearch}
						/>
					</span>
				</div>
			),
		},
		{
			label: "Home",
			//style: {
			//	color: "white",
			//	background: "red",
			//},

			//icon: "pi pi-fw pi-file",
		},
		{
			label: "Timeline",
			//className: "",
			//icon: "pi pi-fw pi-calendar",
		},
	];

	const start = (
		<div className={`mr-8 ${classes.logoContainer}`}>
			<div className="flex justify-content-between">
				<div>
					<img
						alt="logo"
						src={cosocialImg}
						height="40"
						className="hidden sm:block"
					></img>
				</div>
				<div className={`-mt-2 ${classes.brandName}`}>
					<h3>COSOCIAL</h3>
				</div>
			</div>
		</div>
	);

	const end = (
		<div
			className={`${classes.endDiv} flex align-content-center justify-content-between -mb-3`}
		>
			<i
				className="pi pi-sun cursor-pointer mr-5"
				style={{ fontSize: "1.3rem", cursor: "pointer" }}
			></i>
			{/*<i
				className="pi pi-moon cursor-pointer mr-5"
				style={{ fontSize: "1.3rem", cursor: "pointer" }}
			></i>*/}
			<i
				className="pi pi-bell p-overlay-badge mx-2"
				style={{ fontSize: "1.3rem", cursor: "pointer" }}
			>
				<Badge value="2" severity="danger"></Badge>
			</i>
			<i
				className="pi pi-envelope p-overlay-badge mx-2"
				style={{ fontSize: "1.3rem", cursor: "pointer" }}
			>
				{/*<Badge severity="danger"></Badge>*/}
				<i
					className="pi pi-circle-fill text-red-500 absolute -ml-1 -mt-1"
					style={{ fontSize: "0.5rem", cursor: "pointer" }}
				></i>
			</i>
			<i
				className="pi pi-user p-overlay-badge mx-2"
				style={{ fontSize: "1.3rem", cursor: "pointer" }}
			>
				<Badge value="5+" severity="danger"></Badge>
			</i>

			<span></span>
			<Avatar
				image={headshot}
				size="large"
				shape="circle"
				className="ml-4 -mt-3"
			/>
		</div>
	);

	return (
		<Menubar
			className={`${classes.menuBar} text-white h-5rem min-w-screen`}
			start={start}
			model={items}
			end={end}
		/>
	);
}
