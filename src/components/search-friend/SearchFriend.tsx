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
import { Chip } from "primereact/chip";
import { urlImgString } from "../../utils/constants/constants";
import { User } from "../../models/user";
import { useAuth } from "../../hooks/auth/useAuth";
import { getAllUsers } from "../../utils/user-api";

const SearchFriend = () => {
	const [users, setUsers] = useState<any[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<any>(null);
	const [filteredUsers, setFilteredUsers] = useState<any[]>();

	const { authUser, followingUsers } = useAuth();
	const navigate = useNavigate();

	const mutualFriend = followingUsers[0];

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
		if (authUser) {
			getAllUsers(authUser.token).then(allUsers => {
				//console.log(allUsers);
				setUsers(allUsers);
			});
		}

		setUsers(Users);
	}, [authUser]);

	const itemTemplate = (user: User) => {
		return (
			<Chip
				label={user.username}
				key={user.id}
				image={`${urlImgString}${user.profilePicture}`}
				className="bg-primary-reverse font-bold"
				onClick={() => {
					if (user.id === authUser?.userId) {
						navigate(`/profile`);
					} else {
						navigate(`/profile/${user.id}`);
					}
				}}
			/>
		);
	};

	return (
		<div className={`${classes.container} mx-2 mt-2 flex flex-column gap-2`}>
			<AutoComplete
				field="username"
				className=""
				placeholder="Search for People"
				suggestions={filteredUsers}
				completeMethod={search}
				value={selectedUsers}
				onChange={(e: AutoCompleteChangeEvent) => setSelectedUsers(e.value)}
				itemTemplate={itemTemplate}
			/>

			<div className="ml-5 mt-2">
				{mutualFriend && (
					<OnlineFriends
						imageSrc={`${urlImgString}${mutualFriend.profilePicture}`}
						name={mutualFriend.username}
						onClick={() => {
							navigate(`/profile/${mutualFriend.id}`);
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default SearchFriend;
