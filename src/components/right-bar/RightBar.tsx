/** @format */

import { Avatar } from "primereact/avatar";
import { Image } from "primereact/image";
import React from "react";
import classes from "./right-bar.module.css";

export default function RightBar() {
	return (
		<div className={`${classes.rightBar} flex card `}>
			<div>
				<Avatar>
					<Image src="/assets/gift.png" />
				</Avatar>
				<span>
					<b>Jerry</b> and <b>four other cosocials</b> have their birthdays
					today
				</span>
			</div>
		</div>
	);
}
