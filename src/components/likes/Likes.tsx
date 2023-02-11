/** @format */

import { Avatar } from "primereact/avatar";
import React from "react";
import { Posts } from "../../data/dummy-data";
import classes from "./likes.module.css";

const Likes = () => {
	return (
		<div className={`${classes.likesContainer} mr-4`}>
			<ul className="list-none w-11">
				<li className="flex flex-column md:flex-row">
					<div className="flex  gap-1">
						<Avatar size="large" image="/assets/person/4.jpeg" shape="circle" />
						<p className="font-semibold">Chisom</p>
					</div>
					<a href="/3" className="ml-auto mt-3 no-underline text-primary">
						View Profile
					</a>
				</li>
				<li className="flex flex-column md:flex-row">
					<div className="flex  gap-1">
						<Avatar size="large" image="/assets/person/4.jpeg" shape="circle" />
						<p className="font-semibold">Chisom</p>
					</div>
					<a href="/3" className="ml-auto mt-3 no-underline text-primary">
						View Profile
					</a>
				</li>
				<li className="flex flex-column md:flex-row">
					<div className="flex  gap-1">
						<Avatar size="large" image="/assets/person/4.jpeg" shape="circle" />
						<p className="font-semibold">Chisom</p>
					</div>
					<a href="/3" className="ml-auto mt-3 no-underline text-primary">
						View Profile
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Likes;
