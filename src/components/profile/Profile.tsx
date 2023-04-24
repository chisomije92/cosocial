/** @format */

import React, { useEffect, useRef, useState } from "react";
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
import NoPosts from "../no-posts/NoPosts";
import { Post as PostType } from "../../models/post";
import { User } from "../../models/user";

interface ProfileProps {
	user: User;
	userPosts: PostType[];
}

const Profile: React.FC<ProfileProps> = ({ user, userPosts }) => {
	const [visible, setVisible] = useState(false);
	const [showForm, setShowForm] = useState(1);
	const [isFollowing, setIsFollowing] = useState(false);
	const {
		authUser,
		currentUser,
		setCurrentUser,
		handleFollowUser,
		handleUnFollowUser,
		setFollowingUsers,
	} = useAuth();
	const profileRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		profileRef.current?.focus();
	}, []);

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
			{showForm === 1 ? (
				<EditProfile setVisible={setVisible} />
			) : (
				<ChangePassword setVisible={setVisible} />
			)}
		</Dialog>
	);

	const accept = async () => {
		await handleUnFollowUser(user._id);
		if (currentUser) {
			const updatedUser = { ...currentUser };
			const userFollowing = updatedUser.following.filter(v => v !== user._id);
			updatedUser.following = userFollowing;
			setFollowingUsers(prevUsers => {
				return prevUsers.filter(prevUser => prevUser.id !== user._id);
			});
			setCurrentUser(updatedUser);
		}
	};

	const confirm = () => {
		confirmDialog({
			message: "Are you sure you want to stop following this user?",
			header: "Confirmation",
			icon: "pi pi-exclamation-triangle",
			accept,
			reject: () => setIsFollowing(true),
		});
	};

	const setFollowStatus = async () => {
		if (isFollowing) {
			confirm();
			return;
		}
		await handleFollowUser(user._id);
		if (currentUser) {
			const updatedUser = { ...currentUser };
			const userFollowing = [user._id, ...currentUser.following];
			updatedUser.following = userFollowing;
			setCurrentUser(updatedUser);
			setFollowingUsers(prevUsers => {
				return [
					{
						...user,
						id: user._id,
					},
					...prevUsers,
				];
			});
			setCurrentUser(updatedUser);
		}
	};

	useEffect(() => {
		if (currentUser?.following.includes(user._id)) {
			if (!user.followers.includes(currentUser._id)) {
				user.followers.unshift(currentUser._id);
			}
			setIsFollowing(true);
		} else {
			if (currentUser && user.followers.includes(currentUser._id)) {
				const updatedFollowers = user.followers.filter(
					v => v !== currentUser?._id
				);
				user.followers = updatedFollowers;
				setIsFollowing(false);
			}
		}
	}, [currentUser, user._id, user]);

	return (
		<div className={`${classes.profile} mx-3 mt-2`}>
			<Card className="flex justify-content-center card mt-2 surface-50">
				<div className="flex flex-column gap-5">
					<div
						className={`${classes.imgContainer}`}
						ref={profileRef}
						tabIndex={0}
					>
						<Image
							src={`${urlImgString}${user.profilePicture}`}
							alt=""
							height="250"
							width="100%"
							preview
						/>
					</div>

					<div className="">
						<div className="flex flex-column align-items-center mt-2 mb-2">
							<div className="font-bold my-1">{user.username}</div>
							<div className="opacity-80">{user.email}</div>
							<div className="mt-1 font-medium ">{user.description}</div>
						</div>
						<div className="flex justify-content-center"></div>

						<div className="flex gap-3 justify-content-around ">
							<div className="flex gap-1">
								<span>Posts:</span>
								<span className="font-semibold opacity-90">
									{userPosts.length}
								</span>
							</div>
							<Link
								className="text-color no-underline"
								to={`/profile/${user._id}/following`}
							>
								<span className="flex gap-2 cursor-pointer">
									<span>Following:</span>
									<span className="font-semibold opacity-90">
										{user._id === currentUser?._id
											? currentUser?.following?.length
											: user.following.length}
									</span>
								</span>
							</Link>
							<Link
								className="text-color no-underline"
								to={`/profile/${user._id}/followers`}
							>
								<span className="flex gap-2 cursor-pointer">
									<span>Followers:</span>
									<span className="font-semibold opacity-90">
										{user.followers.length}
									</span>
								</span>
							</Link>
						</div>
						{user._id === authUser?.userId && (
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
						)}
						{user._id !== authUser?.userId && (
							<div className="flex flex-column align-items-center gap-1 mt-1">
								<Link to="/messages/1" className="flex no-underline gap-1">
									<ChatRoundedIcon />
									<span>Chat</span>
								</Link>

								<ConfirmDialog />
								{authUser && user.following.includes(authUser.userId) && (
									<span className="font-bold text-lg">Follows you</span>
								)}
								<Button
									label={`${isFollowing ? "Following" : "Follow"}`}
									className={`${classes.followBtn} p-2  border-50 text-center text-white w-4 font-bold bg-black-alpha-60 `}
									onClick={setFollowStatus}
								/>
							</div>
						)}
					</div>
				</div>
			</Card>
			{editProfileForm}

			<div className="">
				{userPosts.length <= 0 && <NoPosts />}
				{userPosts &&
					userPosts.map(p => (
						<Post
							key={p._id}
							post={p}
							user={user}
							showComments
							isAuthUser={user._id === authUser?.userId}
						/>
					))}
			</div>
		</div>
	);
};

export default Profile;
