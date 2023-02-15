/** @format */

import { Avatar } from "primereact/avatar";

import React, { FC } from "react";
import classes from "./likes.module.css";

const Likes: FC<{
	users: any;
}> = ({ users }) => {
	return (
		<div className={`${classes.likesContainer}  m-0  overflow-x-hidden `}>
			<ul className="list-none w-11">
				{users.map((user: any) => (
					<li className="flex flex-column md:flex-row" key={user.id}>
						<div className="flex  gap-1">
							<Avatar size="large" image={user.profilePicture} shape="circle" />
							<p className="font-semibold">{user.username}</p>
						</div>
						<a href="/3" className="ml-auto mt-3 no-underline text-primary">
							View Profile
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Likes;
