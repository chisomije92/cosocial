/** @format */

import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";
import { Users } from "../../data/dummy-data";
import classes from "./messages.module.css";

const Messages = () => {
	const chatUsers = Users.slice(1, 4);
	return (
		<div className={`${classes.container} flex flex-column mt-2 ml-1`}>
			<ul className="list-none">
				{chatUsers.map(u => (
					<li className="my-2" key={u.id}>
						<Card className="mr-auto  w-11">
							<div className="flex flex-column">
								<div className="flex gap-2">
									<Avatar
										image="/assets/person/1.jpeg"
										size="large"
										shape="circle"
									/>
									<div>
										<p className="">Chisom Ijeomah</p>
									</div>
								</div>

								<div className=" border-1 border-100 p-1">
									<p className="ml-2">This is a new Message</p>{" "}
								</div>
							</div>
							<Button label="Reply" className="mt-2 p-button-success py-2" />
						</Card>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Messages;
