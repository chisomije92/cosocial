/** @format */

import { Avatar } from "primereact/avatar";

import React, { FC, useState } from "react";
import { Users } from "../../../data/dummy-data";

import classes from "./reply.module.css";

interface ReplyProp {
	reply: any;
	onClick: () => void;
}

const Reply: FC<ReplyProp> = ({ reply, onClick }) => {
	const [isLiked, setIsLiked] = useState(false);
	const [like, setLike] = useState(reply.like);

	return (
		<li className={`mt-2  p-2 ${classes.listReply}`} key={reply.id}>
			{/*Ensure you get _id of reply, convert it to string and store it as replyId*/}
			<input type="text" value={reply.replyId} hidden readOnly />

			<div className="flex gap-2">
				<Avatar image={reply.photo} shape="circle" className="text-center" />
				<div className="flex flex-column gap-2">
					<small className="opacity-80 ">
						{Users.filter(u => u._id === reply?.userId)[0].username}
					</small>
					<span>{reply.desc}</span>
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
							{like} likes
						</span>
					</div>
				</div>
			</div>
		</li>
	);
};

export default Reply;
