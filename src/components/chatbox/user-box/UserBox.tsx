/** @format */

import { Avatar } from "primereact/avatar";
import classes from "./userbox.module.css";
import { FC } from "react";
import ReactTimeAgo from "react-time-ago";

type UserBoxProps = {
	message: string;
	timeOfMessage: string;
};

const UserBox: FC<UserBoxProps> = ({ message, timeOfMessage }) => {
	return (
		<div
			className={`flex flex-column align-items-end mr-2 ${classes.userbox} mt-1`}
		>
			<div className="flex gap-1">
				{/*<Avatar image="/assets/person/1.jpeg" shape="circle" size="large" />*/}
				<p className="surface-400 p-2 border-1 border-200 border-round-md  text-lg">
					{message}
				</p>
			</div>

			<p className="font-light opacity-70 -mt-3">
				{<ReactTimeAgo date={new Date(timeOfMessage)} locale="en-US" />}
			</p>
		</div>
	);
};

export default UserBox;
