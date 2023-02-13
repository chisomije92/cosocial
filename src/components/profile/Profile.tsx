/** @format */

import React from "react";
import { Card } from "primereact/card";
import { Posts, Users } from "../../data/dummy-data";
import Post from "../post/Post";
import classes from "./profile.module.css";
import { Image } from "primereact/image";

export default function Profile() {
	const userId = Users[0].id;
	const user = Users[0];
	const userPosts = Posts.filter(p => p.userId === userId);

	return (
		<div className={`${classes.profile} mx-3 mt-2`}>
			<Card className="flex flex-column justify-content-center align-items-center card mt-2 surface-50">
				<div className={`${classes.imgContainer}`}>
					<Image
						src="/assets/person/1.jpeg"
						alt=""
						height="260"
						width="240"
						preview
					/>
				</div>
				<div className="flex flex-column align-items-center mt-2 mb-2">
					<div className="font-bold my-1">{user.username}</div>
					<div className="opacity-80">Chisom@gmail.com</div>
					<div className="mt-1 font-medium">This is my description!</div>
				</div>
				<div className="flex gap-3 justify-content-around ">
					<div>
						Posts:{" "}
						<span className="font-semibold opacity-90">{userPosts.length}</span>
					</div>
					<div>
						Following: <span className="font-semibold opacity-90">44</span>
					</div>
					<div>
						Followers: <span className="font-semibold opacity-90">100</span>
					</div>
				</div>
				<div className="flex mt-1">
					<a
						href="#/"
						className={`${classes.link} m-auto text-color no-underline font-semibold`}
					>
						Edit Profile
					</a>
				</div>
			</Card>

			<div className="">
				{userPosts.map(p => (
					<Post key={p.id} post={p} />
				))}
			</div>
		</div>
	);
}
