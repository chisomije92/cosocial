/** @format */

import { Avatar } from "primereact/avatar";

import React, { FC, useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";

import { socket, urlImgString } from "../../../utils/constants/constants";

import classes from "./reply.module.css";
import { useAuth } from "../../../hooks/auth/useAuth";
import { Dialog } from "primereact/dialog";
import Likes from "../../likes/Likes";
import { usePostCtx } from "../../../context/PostContext";
import { Reply as ReplyType } from "../../../models/post";

interface ReplyProp {
	reply: ReplyType;
}

const Reply: FC<ReplyProp> = ({ reply }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [visible, setVisible] = useState(false);

	const { userId } = useAuth();

	const { handleLikeReply, loadedPosts, setLoadedPosts, handleDeleteComment } =
		usePostCtx();

	const handleReplyLike = () => {
		handleLikeReply(loadedPosts[0]._id, reply._id);
		socket.on("posts", data => {
			if (data.action === "likeReply") {
				const updatedPosts = [...loadedPosts];
				const commentIndex = updatedPosts[0]?.comments.findIndex(
					v => v._id === reply._id
				);
				updatedPosts[0].comments[commentIndex] = data.reply;
				setLoadedPosts(updatedPosts);
			}
		});
	};

	const handleDeleteReply = () => {
		handleDeleteComment(loadedPosts[0]._id, reply._id).then(v => {
			const updatedPosts = [...loadedPosts];
			const updatedComments = updatedPosts[0].comments.filter(
				v => v._id !== reply._id
			);
			updatedPosts[0].comments = updatedComments;
			setLoadedPosts(updatedPosts);
		});
	};

	useEffect(() => {
		if (reply.likes.findIndex(v => v?._id === userId) >= 0) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [reply, userId, loadedPosts]);

	const likesDialogue = (
		<Dialog
			header="Cosocials who liked this post:"
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => setVisible(false)}
		>
			<Likes users={reply.likes} />
		</Dialog>
	);

	return (
		<li className={`mt-2  p-2 ${classes.listReply}`} key={reply._id}>
			<div className="flex gap-2 p-2">
				<Avatar
					image={`${urlImgString}${reply.commenter.profilePicture}`}
					shape="circle"
					className="text-center"
				/>
				<div className="flex flex-column gap-2">
					<div className="flex gap-2">
						<small className=" font-semibold text-base">
							{reply.commenter.username}
						</small>
						<small>
							{
								<ReactTimeAgo
									date={new Date(reply.dateOfReply)}
									locale="en-US"
									className="flex"
								/>
							}
						</small>
					</div>

					<span>{reply.comment}</span>
					<div className="flex mt-2 ">
						<span>
							<i
								className={`pi ${
									isLiked ? "pi-thumbs-up-fill" : "pi-thumbs-up"
								} cursor-pointer`}
								onClick={() => {
									handleReplyLike();
								}}
							></i>
							<span
								className="opacity-70 text-sm mx-1  cursor-pointer"
								onClick={() => setVisible(true)}
							>
								{reply.likes.length > 0 ? `${reply.likes.length} likes` : ""}
							</span>
						</span>
					</div>
				</div>
				{reply.commenter.userId === userId && (
					<i
						className="pi pi-trash ml-auto text-red-600 cursor-pointer"
						onClick={() => handleDeleteReply()}
					></i>
				)}
			</div>

			{likesDialogue}
		</li>
	);
};

export default Reply;
