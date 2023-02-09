/** @format */

import { InputText } from "primereact/inputtext";
import React from "react";
import { Users } from "../../data/dummy-data";
import OnlineFriends from "../online-friends/OnlineFriends";
import classes from "./search-friend.module.css";

const SearchFriend = () => {
	const user = Users[2];
	return (
		<div className={`${classes.container} mx-2 mt-2 flex flex-column gap-2`}>
			<InputText
				className="surface-0 surface-border"
				placeholder="Search for friend"
			/>
			<div className="ml-5 mt-2">
				<OnlineFriends imageSrc={user.profilePicture} name={user.username} />
			</div>
		</div>
	);
};

export default SearchFriend;
