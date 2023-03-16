/** @format */

import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import Post from "../post/Post";
import classes from "./profile.module.css";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import EditProfile from "./EditProfile";
import ChangePassword from "../change-password/ChangePassword";
import { Link } from "react-router-dom";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { urlImgString } from "../../utils/constants/constants";
import { useAuth } from "../../hooks/auth/useAuth";

interface ProfileProps {
	user: any;
	userPosts: any;
}

const Profile: React.FC<ProfileProps> = ({ user, userPosts }) => {
	const [visible, setVisible] = useState(false);
	const [showForm, setShowForm] = useState(1);
	const [isFollowing, setIsFollowing] = useState(false);
	const { authUser } = useAuth();

	const editProfileForm = (
		<Dialog
			header={`${showForm === 1 ? "Edit Profile" : "Change Password"}`}
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => {
				setVisible(false);
			}}
			className="w-27rem"
		>
			{showForm === 1 ? <EditProfile /> : <ChangePassword />}
		</Dialog>
	);

	const confirm = () => {
		confirmDialog({
			message: "Are you sure you want to stop following this user?",
			header: "Confirmation",
			icon: "pi pi-exclamation-triangle",
			accept: () => setIsFollowing(false),
			reject: () => setIsFollowing(true),
		});
	};

	const setFollowStatus = () => {
		if (isFollowing) {
			confirm();
			return;
		}
		setIsFollowing(prev => !prev);
	};

	return (
		<div className={`${classes.profile} mx-3 mt-2`}>
			<Card className="flex flex-column justify-content-center align-items-center card mt-2 surface-50">
				<div className={`${classes.imgContainer}`}>
					<Image
						src={`${urlImgString}${user.profilePicture}`}
						alt=""
						height="260"
						width="240"
						preview
					/>
				</div>
				<div className="flex flex-column align-items-center mt-2 mb-2">
					<div className="font-bold my-1">{user.username}</div>
					<div className="opacity-80">{user.email}</div>
					<div className="mt-1 font-medium">{user.description}</div>
				</div>
				<div className="flex gap-3 justify-content-around ">
					<div>
						Posts:{" "}
						<span className="font-semibold opacity-90">{userPosts.length}</span>
					</div>
					<Link className="text-color no-underline" to={`following`}>
						<span className="flex gap-2 cursor-pointer">
							<span>Following:</span>
							<span className="font-semibold opacity-90">
								{user.following.length}
							</span>
						</span>
					</Link>
					<Link className="text-color no-underline" to={`followers`}>
						<span className="flex gap-2 cursor-pointer">
							<span>Followers:</span>
							<span className="font-semibold opacity-90">
								{user.followers.length}
							</span>
						</span>
					</Link>
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
				{user._id !== authUser?.userId && (
					<div className="flex flex-column align-items-center gap-1">
						<Link to="/messages/1" className="flex no-underline gap-1">
							<ChatRoundedIcon />
							<span>Chat</span>
						</Link>
						<ConfirmDialog />
						<Button
							label={`${isFollowing ? "Following" : "Follow"}`}
							className={`${classes.followBtn} p-2  border-50 text-center text-white w-4 font-bold  bg-bluegray-900 `}
							onClick={setFollowStatus}
						/>
					</div>
				)}
			</Card>
			{editProfileForm}

			<div className="">
				{userPosts.map((p: any) => (
					<Post key={p._id} post={p} user={user} showComments />
				))}
			</div>
		</div>
	);
};

export default Profile;
