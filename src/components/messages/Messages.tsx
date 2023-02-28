/** @format */

import { Avatar } from "primereact/avatar";

import React from "react";
import { Users } from "../../data/dummy-data";

import classes from "./messages.module.css";

const Messages = () => {
	//const chatUsers = Users.slice(1, 4);
	const chatUsers = Users.slice();
	return (
		<div className={`${classes.container} flex justify-content-center`}>
			<ul className="list-none w-7 flex flex-column">
				<li>
					<p className="ml-3 text-3xl font-bold">Messages</p>
				</li>
				{chatUsers.map(u => (
					<li className="my-2 flex w-12" key={u.id}>
						<div className="flex flex-column">
							<div className="flex gap-1">
								<Avatar
									image="/assets/person/1.jpeg"
									size="xlarge"
									shape="circle"
									className="mt-3"
								/>
								<div className="mt-1">
									<p className="font-semibold ">Chisom Ijeomah</p>
									<p className="-mt-2 font-light text-500">
										This is a new Message
									</p>
								</div>
							</div>
						</div>
						<div className="ml-auto mt-3 mr-3 opacity-70">20 seconds ago</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Messages;
