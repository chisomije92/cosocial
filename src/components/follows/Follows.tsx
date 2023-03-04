/** @format */

import { Card } from "primereact/card";
import React from "react";
import classes from "./follows.module.css";

import { Users } from "../../data/dummy-data";
import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";

const Follows: React.FC<{
	followList: string;
}> = ({ followList }) => {
	return (
		<div className={`${classes.container} card mt-3`}>
			<Card className="surface-100">
				<h2 className="-mt-3 capitalize">{followList}</h2>
				<ul className="list-none ">
					{Users.map(u => (
						<li className="flex justify-content-between " key={u.id}>
							<div className="my-2 flex gap-2">
								<Avatar image={u.profilePicture} size="large" />
								<div className="flex flex-column -mt-3">
									<p className=" font-semibold">{u.username}</p>
									<span className="-mt-3">This is a user</span>
								</div>
							</div>
							<div className="mr-2">
								<Link
									className="no-underline text-primary"
									to={`/profile/${u.id}`}
								>
									View Profile
								</Link>
							</div>
						</li>
					))}
				</ul>
			</Card>
		</div>
	);
};

export default Follows;
