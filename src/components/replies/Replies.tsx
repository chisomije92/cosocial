/** @format */

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState, FC } from "react";
import { Users } from "../../data/dummy-data";
import Likes from "../likes/Likes";
import classes from "./replies.module.css";
import Reply from "./reply/Reply";

interface RepliesProp {
	replies?: any;
}

const Replies: FC<RepliesProp> = ({ replies }) => {
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
		<div className={`${classes.replies} card mt-2`}>
			<div className={`${classes.inputContainer}`}>
				<InputTextarea
					className="w-12 h-5rem p-2 border-1"
					placeholder="Add a comment"
					autoResize
				/>
				<Button label="Comment" className="p-2 text-white font-bold mt-1" />
			</div>
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
