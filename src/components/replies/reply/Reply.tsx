/** @format */

import { Avatar } from "primereact/avatar";

import React, { FC, useState } from "react";
import ReactTimeAgo from "react-time-ago";

import { urlImgString } from "../../../utils/constants/constants";

import classes from "./reply.module.css";

interface ReplyProp {
	reply: any;
	onClick: () => void;
}

const Reply: FC<ReplyProp> = ({ reply, onClick }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [like, setLike] = useState(reply.like);

	return (
		<li className={`mt-2  p-2 ${classes.listReply}`} key={reply._id}>
			{/*Ensure you get _id of reply, convert it to string and store it as replyId*/}
			<input type="text" value={reply.replyId} hidden readOnly />

			<div className="flex gap-2">
				<Avatar
					image={`${urlImgString}${reply.commenter.profilePicture}`}
					shape="circle"
					className="text-center"
				/>
				<div className="flex flex-column gap-2">
					<div className="flex gap-2 ">
						<small className=" font-semibold text-base">
							{reply.commenter.username}
						</small>
						<small>
							{
								<ReactTimeAgo
									date={new Date(reply.dateOfReply)}
									locale="en-US"
								/>
							}
						</small>
					</div>

					<span>{reply.comment}</span>
					<div className="flex mt-2">
						<i
							className={`pi ${
								isLiked ? "pi-thumbs-up-fill" : "pi-thumbs-up"
							} cursor-pointer`}
							onClick={() => {
								setLike(isLiked ? like - 1 : like + 1);
								setIsLiked(prev => !prev);
							}}
						></i>
						<span
							className="opacity-70 text-sm mx-1  cursor-pointer"
							onClick={onClick}
						>
							{reply.likes.length > 0 ? `${reply.likes.length} likes` : ""}
						</span>
					</div>
				</div>
			</div>
		</li>
	);
};

export default Reply;
