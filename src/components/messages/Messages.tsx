/** @format */

import { Avatar } from "primereact/avatar";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../../data/dummy-data";

import classes from "./messages.module.css";
import { useChatCtx } from "../../context/ChatContext";
import { urlImgString } from "../../utils/constants/constants";
import ReactTimeAgo from "react-time-ago";

const Messages = () => {
	//const chatUsers = Users.slice(1, 5);
	const navigate = useNavigate();
	const [chatUsers, setChatUsers] = useState<any[]>();
	const { getConversation, getUsersForChat } = useChatCtx();
	//const { authUser } = useAuth();
	useEffect(() => {
		getUsersForChat().then((users: any) => {
			//console.log(users);
			setChatUsers(users);
		});
	}, []);

	return (
		<div className={`${classes.container} flex justify-content-center`}>
			<ul className="list-none w-7 flex flex-column">
				<li>
					<p className="ml-3 text-3xl font-bold">Messages</p>
				</li>
				{chatUsers &&
					chatUsers.map(u => (
						<li
							className="my-2 flex w-12"
							key={u._id}
							onClick={() => {
								navigate(`${u._id}`);
							}}
						>
							<div className="flex flex-column">
								<div className="flex gap-1">
									<Avatar
										image={`${urlImgString}${u.profilePicture}`}
										size="xlarge"
										shape="circle"
										className="mt-3"
									/>
									<div className="mt-1">
										<p className="font-semibold ">{u.username}</p>
										<p className="-mt-2 font-light text-500">
											{u.recentMessage}
										</p>
									</div>
								</div>
							</div>
							<div className="ml-auto mt-3 mr-3 opacity-70">
								{<ReactTimeAgo date={new Date(u.recentDate)} locale="en-US" />}
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default Messages;
