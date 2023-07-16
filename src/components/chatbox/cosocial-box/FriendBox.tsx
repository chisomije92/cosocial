/** @format */

import { Avatar } from "primereact/avatar";
import React, { FC } from "react";
import classes from "./friendbox.module.css";
import ReactTimeAgo from "react-time-ago";
import { urlImgString } from "../../../utils/constants/constants";

type FriendBoxProps = {
	message: string;
	timeOfMessage: string;
	userImage: string;
};
const FriendBox: FC<FriendBoxProps> = ({
	message,
	timeOfMessage,
	userImage,
}) => {
	return (
		<div className={`flex flex-column align-items-start  ${classes.friendbox}`}>
			<div className="flex gap-2">
				<Avatar
					//image="/assets/person/2.jpeg"
					image={`${urlImgString}${userImage}`}
					shape="circle"
					size="large"
				/>

				<p
					className="p-2 border-1 border-200 border-round-xl font-light text-lg
				bg-white-alpha-90 text-black-alpha-80"
				>
					{message}
				</p>
			</div>
			<p className="font-light opacity-70 -mt-3">
				{<ReactTimeAgo date={new Date(timeOfMessage)} locale="en-US" />}
			</p>
		</div>
	);
};

export default FriendBox;
