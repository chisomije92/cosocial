/** @format */

import { Avatar } from "primereact/avatar";

import React, { FC } from "react";
import { Link } from "react-router-dom";
import { urlImgString } from "../../utils/constants/constants";
import classes from "./likes.module.css";
import { ActionUser } from "../../models/post";

const Likes: FC<{
	users?: ActionUser[];
}> = ({ users }) => {
	return (
		<div className={`${classes.likesContainer}  m-0  overflow-x-hidden `}>
			<ul className="list-none w-11">
				{users?.map(user => (
					<li className="flex flex-column md:flex-row" key={user._id}>
						<div className="flex  gap-1">
							<Avatar
								size="large"
								image={`${urlImgString}${user.profilePicture}`}
								shape="circle"
							/>
							<p className="font-semibold">{user.username}</p>
						</div>
						<Link
							to={`/profile/${user._id}`}
							className="ml-auto mt-3 no-underline text-primary"
						>
							View Profile
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Likes;
