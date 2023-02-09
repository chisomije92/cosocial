/** @format */

import { Card } from "primereact/card";
import React from "react";
import classes from "./followers.module.css";
import { ScrollPanel } from "primereact/scrollpanel";
import { Users } from "../../data/dummy-data";
import { Avatar } from "primereact/avatar";

const Followers = () => {
	return (
		<div className={`${classes.container} card mt-3`}>
			<Card className="" title="Followers">
				<ScrollPanel
					style={{ width: "100%", height: "350px" }}
					className={`${classes.customBar}`}
				>
					<ul className="list-none -ml-4">
						{Users.map(u => (
							<li className="flex flex-column align-items-start " key={u.id}>
								<div className="my-2 flex gap-2">
									<Avatar image={u.profilePicture} size="large" />
									<p className=" font-semibold">{u.username}</p>
								</div>
							</li>
						))}
					</ul>
				</ScrollPanel>
			</Card>
		</div>
	);
};

export default Followers;
