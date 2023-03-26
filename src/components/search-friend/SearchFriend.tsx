/** @format */

import React, { useState, useEffect } from "react";
import { Users } from "../../data/dummy-data";
import OnlineFriends from "../online-friends/OnlineFriends";
import classes from "./search-friend.module.css";
import {
	AutoComplete,
	AutoCompleteChangeEvent,
	AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { useNavigate } from "react-router-dom";

const SearchFriend = () => {
	const [users, setUsers] = useState<any[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<any>(null);
	const [filteredUsers, setFilteredUsers] = useState<any[]>();
	const navigate = useNavigate();

	const user = Users[2];

	const search = (event: AutoCompleteCompleteEvent) => {
		// Timeout to emulate a network connection
		setTimeout(() => {
			let _filteredUsers;

			if (!event.query.trim().length) {
				_filteredUsers = [...users];
			} else {
				_filteredUsers = users.filter(user => {
					return user.username
						.toLowerCase()
						.startsWith(event.query.toLowerCase());
				});
			}

			setFilteredUsers(_filteredUsers);
		}, 250);
	};

	useEffect(() => {
		setUsers(Users);
	}, []);

	const itemTemplate = (item: any) => {
		return (
			<div
				className="flex align-items-center list-none"
				key={item.id}
				onClick={() => {
					navigate(`/profile/${item.id}`);
				}}
			>
				<div>{item.username}</div>
			</div>
		);
	};

	return (
		<div className={`${classes.container} mx-2 mt-2 flex flex-column gap-2`}>
			<AutoComplete
				field="username"
				className=""
				placeholder="Search for friend"
				suggestions={filteredUsers}
				completeMethod={search}
				value={selectedUsers}
				onChange={(e: AutoCompleteChangeEvent) => setSelectedUsers(e.value)}
				itemTemplate={itemTemplate}
			/>

			<div className="ml-5 mt-2">
				<OnlineFriends
					imageSrc={user.profilePicture}
					name={user.username}
					onClick={() => {
						navigate(`/profile/${user._id}`);
					}}
				/>
			</div>
		</div>
	);
};

export default SearchFriend;
