/** @format */

import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useState, FC } from "react";
import classes from "./replies.module.css";
import Reply from "./reply/Reply";
import { useAuth } from "../../hooks/auth/useAuth";
import { socket } from "../../utils/constants/constants";

interface RepliesProp {
	replies?: any;
}

const Replies: FC<RepliesProp> = ({ replies }) => {
	const [comment, setComment] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const { handleCommentOnPost, setLoadedPosts, loadedPosts } = useAuth();

	const onComment = () => {
		setLoading(true);
		const replyId = loadedPosts[0]._id;
		if (comment.length > 0) {
			handleCommentOnPost(replyId, comment);

			socket.on("posts", data => {
				if (data.action === "comment") {
					const updatedPost = [...loadedPosts];
					const commentIndex = updatedPost[0].comments.findIndex(
						(v: any) => v._id === data.reply._id
					);
					if (commentIndex < 0) {
						updatedPost[0].comments.unshift(data.reply);
						setLoadedPosts(updatedPost);
						setLoading(false);
						setComment("");
					}
				}
			});
		}
	};

	return (
		<div className={`${classes.replies} card mt-2`}>
			<div className={`${classes.inputContainer}`}>
				<InputTextarea
					className="w-12 h-5rem p-2 border-1"
					placeholder="Add a comment"
					value={comment}
					onChange={e => setComment(e.target.value)}
					autoResize
				/>
				<Button
					label="Comment"
					className="p-2 text-white font-bold mt-1"
					onClick={() => onComment()}
					disabled={comment.length === 0 || loading}
				/>
			</div>
			<ul className="list-none">
				{replies?.map((reply: any) => (
					<Reply reply={reply} key={reply._id} />
				))}
			</ul>
		</div>
	);
};

export default Replies;
