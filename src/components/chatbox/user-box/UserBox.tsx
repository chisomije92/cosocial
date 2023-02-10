/** @format */

import { Avatar } from "primereact/avatar";
import classes from "./userbox.module.css";

const UserBox = () => {
	return (
		<div
			className={`flex flex-column align-items-start ${classes.userbox} mt-1`}
		>
			<div className="flex gap-1">
				<Avatar image="/assets/person/1.jpeg" shape="circle" size="large" />
				<p className="p-2 border-1 border-200 border-round-xl font-light text-lg bg-white-alpha-90 text-black-alpha-80">
					Hi! This is from user
				</p>
			</div>

			<p className="font-light opacity-70 -mt-3">13 minutes ago</p>
		</div>
	);
};

export default UserBox;
