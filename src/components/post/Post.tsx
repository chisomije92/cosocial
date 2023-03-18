/** @format */

import classes from "./post.module.css";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import { FC, useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Image } from "primereact/image";
import { Users } from "../../data/dummy-data";
import Likes from "../likes/Likes";
import { Link, useNavigate } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import ReactTimeAgo from "react-time-ago";
import { urlImgString } from "../../utils/constants/constants";
import { useAuth } from "../../hooks/auth/useAuth";

interface PostProp {
	post: any;
	user?: any;
	showComments?: boolean;
	isAuthUser?: boolean;
}

const Post: FC<PostProp> = ({ post, user, showComments, isAuthUser }) => {
	const op = useRef<any>(null);
	const navigate = useNavigate();
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

	const setImageString = () => {
		let imgString: string;

		if (user) {
			imgString = `${urlImgString}${user.profilePicture}`;
		} else if (!user && post._id) {
			imgString = `${urlImgString}${post.linkedUser.profilePicture}`;
		} else {
			imgString = `${post.linkedUser.profilePicture}`;
		}

		return imgString;
	};
	return (
		<>
			<div
				className={`card mt-3 ${classes.container} shadow-1 border-round-sm w-12 mx-auto flex flex-column`}
			>
				<div>
					<div className="flex justify-content-between gap-2 ml-3 mt-2 -mb-2">
						<div className="flex gap-2">
							<Link
								to={isAuthUser ? "/profile" : `/profile/${post.userId}`}
								className="flex gap-1 no-underline text-color"
							>
								<Avatar
									image={setImageString()}
									size="normal"
									shape="circle"
									className=""
								/>
								<span className=" font-semibold">
									{user ? user.username : post.linkedUser.username}
								</span>
							</Link>
							<span className=" opacity-70 text-sm">
								<ReactTimeAgo date={new Date(post.createdAt)} locale="en-US" />
							</span>
						</div>
						{isAuthUser && (
							<>
								<i
									className={`pi pi-ellipsis-v ml-auto mr-1 my-3
							`}
									onClick={e => {
										if (isAuthUser) {
											op.current.toggle(e);
										}
									}}
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
							</>
						)}
					</div>
				</div>
				<div className="ml-3 text-700">
					<p>{post.description}</p>
				</div>
				<div className={classes.postImgContainer}>
					<Image
						src={post._id ? `${urlImgString}${post.image}` : `${post.image}`}
						alt="Image"
						width="100%"
						className="mb-4"
						preview
					/>
				</div>
				<div className="flex justify-content-between gap-2 mb-3">
					<div className="flex mt-2 md:flex-row">
						<div className={!post._id ? `${classes.disableInteractions}` : ""}>
							{post._id && (
								<Avatar
									icon="pi pi-thumbs-up-fill cursor-pointer"
									shape="circle"
									className={`mr-1 ml-3 mb-2 bg-blue-500 
							${isLiked ? "text-color" : "text-white"}
							border-circle`}
									onClick={handleLike}
								/>
							)}
							{!post._id && (
								<Avatar
									icon="pi pi-thumbs-up-fill cursor-pointer"
									shape="circle"
									className={`mr-1 ml-3 mb-2 bg-blue-500 text-white
							border-circle`}
									onClick={handleLike}
								/>
							)}
						</div>
						<div className={!post._id ? `${classes.disableInteractions}` : ""}>
							{post._id && (
								<Avatar
									icon="pi pi-bookmark-fill cursor-pointer"
									className={`bg-red-600 ${
										isBookmarked ? "text-color" : "text-white"
									} border-circle`}
									onClick={handleBookmark}
								/>
							)}
							{!post._id && (
								<Avatar
									icon="pi pi-bookmark-fill"
									className={`bg-red-600 text-white
									border-circle`}
								/>
							)}
						</div>
						<div>
							<span
								className="opacity-70 text-sm mx-1 cursor-pointer"
								onClick={() => setVisible(true)}
							>
								{post.likes.length > 0 ? `${post.likes.length} likes` : ""}
							</span>
						</div>
					</div>
					<div className="flex justify-content-even opacity-60 mr-1">
						{showComments ? (
							<Link
								to={`/post/${post._id}`}
								className="no-underline text-900 flex gap-1 mt-2"
							>
								<span>{post.comments.length}</span>
								<span className="hidden md:block">comments</span>
								<CommentIcon className="inline-block md:hidden" />
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
