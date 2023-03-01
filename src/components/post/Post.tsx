/** @format */

import classes from "./post.module.css";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import { FC, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Image } from "primereact/image";
import { Users } from "../../data/dummy-data";
import Likes from "../likes/Likes";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";

const Post: FC<{
	post: any;
	showComments?: boolean;
}> = ({ post, showComments }) => {
	const op = useRef<any>(null);
	const [like, setLike] = useState(post.like);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [visible, setVisible] = useState(false);

	const handleLike = () => {
		setLike(isLiked ? like - 1 : like + 1);
		setIsLiked(!isLiked);
	};

	const handleBookmark = () => {
		setIsBookmarked(prev => !prev);
	};

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
		<>
			<div
				className={`card mt-3 ${classes.container} shadow-1 border-round-sm w-12 mx-auto`}
			>
				<div>
					<div className="flex">
						<Avatar
							image={Users.filter(u => u.id === post?.userId)[0].profilePicture}
							size="normal"
							shape="circle"
							className="mx-2 my-2"
						/>
						<span className="mx-1 my-2 font-semibold">
							{Users.filter(u => u.id === post?.userId)[0].username}
						</span>
						<span className="mx-1 my-2 font-light text-sm">{post.date}</span>
						<i
							className="pi pi-ellipsis-v ml-auto mr-1 my-3  cursor-pointer"
							onClick={e => op.current.toggle(e)}
						></i>
						<OverlayPanel ref={op} className="mt-2 -ml-6">
							<div
								className={`flex text-blue-400 font-medium ${classes.actions} cursor-pointer`}
							>
								<span>Edit</span> <i className="pi pi-pencil ml-2"></i>
							</div>

							<hr className="h-1 w-6rem -mr-3 -ml-3" />
							<div
								className={`flex text-red-500 font-medium ${classes.actions} cursor-pointer`}
							>
								<span>Delete</span> <i className="pi pi-trash ml-2"></i>
							</div>
						</OverlayPanel>
					</div>
				</div>
				<div className="ml-3 text-700">
					<p>{post.desc}</p>
				</div>
				<div className="">
					<Image
						src={post.photo}
						alt="Image"
						width="100%"
						className="mx-3"
						preview
					/>
				</div>
				<div className="flex justify-content-between gap-2 mb-3">
					<div className="flex mt-2 md:flex-row">
						<div>
							<Avatar
								icon="pi pi-thumbs-up-fill cursor-pointer"
								shape="circle"
								className={`mr-1 ml-3 mb-2 bg-blue-500 
							${isLiked ? "text-color" : "text-white"}
							border-circle`}
								onClick={handleLike}
							/>
						</div>
						<div>
							<Avatar
								icon="pi pi-bookmark-fill cursor-pointer"
								className={`bg-red-600 ${
									isBookmarked ? "text-color" : "text-white"
								} border-circle`}
								onClick={handleBookmark}
							/>
						</div>
						<div>
							<span
								className="opacity-70 text-sm mx-1 cursor-pointer"
								onClick={() => setVisible(true)}
							>
								{like} likes
							</span>
						</div>
					</div>
					<div className="flex justify-content-even opacity-60 mr-1">
						{showComments ? (
							<Link to={`/post/${post.id}`} className="no-underline text-900">
								<p className=" mt-4 border-200">{post.comment} comments</p>
							</Link>
						) : (
							<span className="flex gap-1">
								<span>{post.comment}</span>
								<span className="hidden md:block">comments</span>
								<CommentIcon className="inline-block md:hidden" />
							</span>
						)}

						<code>&nbsp;</code>
					</div>
				</div>
			</div>
			{likesDialogue}
		</>
	);
};

export default Post;
