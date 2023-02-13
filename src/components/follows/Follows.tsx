/** @format */

import { Card } from "primereact/card";
import React, { FC } from "react";
import classes from "./follows.module.css";
import { ScrollPanel } from "primereact/scrollpanel";
import { Users } from "../../data/dummy-data";
import { Avatar } from "primereact/avatar";

const Follows: FC<{
	follows?: string;
}> = ({ follows }) => {
	return (
		<div className={`${classes.container} card mt-3`}>
			<Card className="capitalize" title={follows}>
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

export default Follows;
