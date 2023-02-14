/** @format */

import { Dialog } from "primereact/dialog";
import React, { useState, FC } from "react";
import { Users } from "../../data/dummy-data";
import Likes from "../likes/Likes";
import classes from "./replies.module.css";
import Reply from "./reply/Reply";

const Replies: FC<{
	replies?: any;
}> = ({ replies }) => {
	const [visible, setVisible] = useState(false);

	const likesDialogue = (
		<Dialog
			header="Cosocials who liked this post:"
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => setVisible(false)}
		>
			<Likes users={Users} />
		</Dialog>
	);
	return (
		<div className={`${classes.replies} card`}>
			<ul className="list-none">
				{replies.map((reply: any) => (
					<Reply
						reply={reply}
						onClick={() => setVisible(false)}
						key={reply.id}
					/>
				))}
			</ul>
			{likesDialogue}
		</div>
	);
};

export default Replies;