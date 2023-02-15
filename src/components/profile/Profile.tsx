/** @format */

import React, { useState } from "react";
import { Card } from "primereact/card";
import { Posts, Users } from "../../data/dummy-data";
import Post from "../post/Post";
import classes from "./profile.module.css";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import EditProfile from "./EditProfile";
import ChangePassword from "../change-password/ChangePassword";
import { Link } from "react-router-dom";

export default function Profile() {
	const [visible, setVisible] = useState(false);
	const [showForm, setShowForm] = useState(1);

	const userId = Users[0].id;
	const user = Users[0];
	const userPosts = Posts.filter(p => p.userId === userId);
	const editProfileForm = (
		<Dialog
			header={`${showForm === 1 ? "Edit Profile" : "Change Password"}`}
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => setVisible(false)}
			className="w-27rem"
		>
			{showForm === 1 ? <EditProfile /> : <ChangePassword />}
		</Dialog>
	);

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
						<Link
							to="/profile?cosocials=following"
							className={`${classes.link} no-underline text-color`}
						>
							Following: <span className="font-semibold opacity-90">44</span>
						</Link>
					</div>
					<div>
						<Link
							to="/profile?cosocials=followers"
							className={`${classes.link} no-underline text-color`}
						>
							Followers: <span className="font-semibold opacity-90">100</span>
						</Link>
					</div>
				</div>
				<div className="flex mt-1 ">
					<Button
						label="Edit profile"
						className="p-2 m-auto surface-50 border-0 text-primary border-50"
						onClick={() => {
							setVisible(true);
							setShowForm(1);
						}}
					/>
					<Button
						label="Change password"
						className="p-2 m-auto surface-50 border-0 text-primary border-50"
						onClick={() => {
							setVisible(true);
							setShowForm(2);
						}}
					/>
				</div>
			</Card>
			{editProfileForm}

			<div className="">
				{userPosts.map(p => (
					<Post key={p.id} post={p} showComments />
				))}
			</div>
		</div>
	);
}
