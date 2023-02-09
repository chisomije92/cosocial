/** @format */

import classes from "./userbox.module.css";

const UserBox = () => {
	return (
		<div className={`flex justify-content-end ${classes.userbox} mt-1`}>
			<p className="px-1 border-1 border-200 border-round-md font-light text-lg">
				Hi! This is from user
			</p>
		</div>
	);
};

export default UserBox;
