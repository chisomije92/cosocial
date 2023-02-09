/** @format */

import { Card } from "primereact/card";
import React from "react";
import classes from "./followers.module.css";
import { ScrollPanel } from "primereact/scrollpanel";
import { Chip } from "primereact/chip";
import { Users } from "../../data/dummy-data";

const Followers = () => {
	return (
		<div className={`${classes.container} card mt-3`}>
			<Card className="" title="Followers">
				<ScrollPanel
					style={{ width: "100%", height: "300px" }}
					className={`${classes.customBar}`}
				>
					<ul className="list-none -ml-4">
						{Users.map(u => (
							<li className="flex flex-column align-items-start">
								<div className="my-2">
									<Chip
										label={"Chisom Ijeomah"}
										image={"/assets/person/3.jpeg"}
										className="bg-primary-reverse font-bold"
									/>
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
