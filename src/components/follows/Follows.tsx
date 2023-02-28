/** @format */

import { Card } from "primereact/card";
import React from "react";
import classes from "./follows.module.css";

import { Users } from "../../data/dummy-data";
import { Avatar } from "primereact/avatar";

const Follows = () => {
	return (
		<div className={`${classes.container} card mt-3`}>
			<Card className="surface-100">
				<ul className="list-none ">
					{Users.map(u => (
						<li className="flex flex-column align-items-start " key={u.id}>
							<div className="my-2 flex gap-2">
								<Avatar image={u.profilePicture} size="large" />
								<p className=" font-semibold">{u.username}</p>
							</div>
						</li>
					))}
				</ul>
			</Card>
		</div>
	);
};

export default Follows;
