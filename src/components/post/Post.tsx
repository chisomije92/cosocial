/** @format */

import classes from "./post.module.css";
import { Avatar } from "primereact/avatar";
import { Dialog } from "primereact/dialog";
import { FC, useEffect, useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Image } from "primereact/image";
import Likes from "../likes/Likes";
import { Link } from "react-router-dom";
import CommentIcon from "@mui/icons-material/Comment";
import ReactTimeAgo from "react-time-ago";
import { urlImgString } from "../../utils/constants/constants";
import { useAuth } from "../../hooks/auth/useAuth";
import EditPost from "./EditPost";
import { usePostCtx } from "../../context/PostContext";
import { Post as PostType } from "../../models/post";
import { User } from "../../models/user";
import { useSocketCtx } from "../../hooks/socket/useSocket";

interface PostProp {
	noPostObj?: Partial<PostType>;
	post?: PostType;
	user?: User;
	showComments?: boolean;
	isAuthUser?: boolean;
}

const Post: FC<PostProp> = ({
	post,
	user,
	showComments,
	isAuthUser,
	noPostObj,
}) => {
	const op = useRef<any>(null);
	const { socket } = useSocketCtx();
	const { currentUser, setCurrentUser, userId } = useAuth();
	const { handleBookmarkPost } = usePostCtx();

	const {
		deletePost,
		setLoadedPosts,
		loadedPosts,
		handleLikePost,
		setIsPostDeleted,
		setPost,
	} = usePostCtx();

	const [isBookmarked, setIsBookmarked] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [visible, setVisible] = useState(false);
	const [description, setDescription] = useState<string>(
		post?.description ? post.description : ""
	);
	const [selectedPostImageFile, setSelectedPostImageFile] = useState<{
		preview: string;
		data: File | null;
		text: string | null;
	}>({ preview: "", data: null, text: null });
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const handleLike = () => {
		post && handleLikePost(post._id);
		socket?.on("posts", data => {
			if (data.action === "like") {
				const index =
					loadedPosts && loadedPosts.findIndex(p => p._id === data.post._id);
				const updatedPosts = [...loadedPosts];
				const updatedPost = data.post;
				updatedPosts[index] = updatedPost;
				setLoadedPosts(updatedPosts);
			}
		});
	};

	const handleBookmark = () => {
		post && handleBookmarkPost(post._id);
		socket?.on("posts", data => {
			if (data.action === "bookmark" && data.user._id === currentUser?._id) {
				setCurrentUser(data.user);
			}
		});
	};
	useEffect(() => {
		if (post && post?.likes.findIndex(v => v?._id === userId) >= 0) {
			setIsLiked(true);
		} else {
			setIsLiked(false);
		}
	}, [post, userId]);

	useEffect(() => {
		if (
			currentUser &&
			currentUser.bookmarks.findIndex(v => v._id === post?._id) >= 0
		) {
			setIsBookmarked(true);
		} else {
			setIsBookmarked(false);
		}
	}, [post, currentUser]);

	const likesDialogue = (
		<Dialog
			header="Cosocials who liked this post:"
			visible={visible}
			style={{ width: "50vw" }}
			onHide={() => setVisible(false)}
		>
			<Likes users={post ? post.likes : noPostObj?.likes} />
		</Dialog>
	);

	const setImageString = () => {
		let imgString: string;

		if (user) {
			imgString = `${urlImgString}${user.profilePicture}`;
		} else if (!user && post?._id) {
			imgString = `${urlImgString}${post?.linkedUser.profilePicture}`;
		} else {
			imgString = `${noPostObj?.linkedUser?.profilePicture}`;
		}

		return imgString;
	};

	const handleDelete = () => {
		post && deletePost(post._id);
		socket?.on("posts", data => {
			if (data.action === "delete") {
				setIsPostDeleted(true);
				setPost(data.post);
			}
		});

		op.current.hide();
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
								to={isAuthUser ? "/profile" : `/profile/${post?.userId}`}
								className="flex gap-1 no-underline text-color"
							>
								<Avatar
									image={setImageString()}
									size="normal"
									shape="circle"
									className=""
								/>
								<span className=" font-semibold">
									{user ? user.username : post?.linkedUser.username}
								</span>
							</Link>
							{post && (
								<span className=" opacity-70 text-sm">
									<ReactTimeAgo
										date={new Date(post.createdAt)}
										locale="en-US"
									/>
								</span>
							)}
						</div>
						{isAuthUser && (
							<>
								<i
									className={`pi pi-ellipsis-v ml-auto mr-1 my-3 cursor-pointer
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
										onClick={() => {
											setIsEditing(!isEditing);
											op.current.hide();
										}}
									>
										<span>Edit</span> <i className="pi pi-pencil ml-2"></i>
									</div>

									<hr className="h-1 w-6rem -mr-3 -ml-3" />
									<div
										className={`flex text-red-500 font-medium ${classes.actions} cursor-pointer`}
										onClick={handleDelete}
									>
										<span>Delete</span> <i className="pi pi-trash ml-2"></i>
									</div>
								</OverlayPanel>
							</>
						)}
					</div>
				</div>
				{!isEditing && (
					<>
						<div className="ml-3 text-700">
							<p>{post ? post.description : noPostObj?.description}</p>
						</div>
						<div className={classes.postImgContainer}>
							{post?.image ? (
								<Image
									src={
										post?._id
											? `${urlImgString}${post?.image}`
											: `${post?.image}`
									}
									alt="Image"
									width="100%"
									className="mb-4"
									preview
								/>
							) : (
								<Image
									src={noPostObj?.image}
									alt="Image"
									width="100%"
									className="mb-4"
									preview
								/>
							)}
						</div>
						<div className="flex justify-content-between gap-2 mb-3">
							<div className="flex mt-2 md:flex-row">
								<div
									className={!post?._id ? `${classes.disableInteractions}` : ""}
								>
									{post?._id && (
										<Avatar
											icon="pi pi-thumbs-up-fill cursor-pointer"
											shape="circle"
											className={`mr-1 ml-3 mb-2 bg-blue-500 
											${isLiked ? "text-blue-900" : "text-white"}
											border-circle`}
											onClick={handleLike}
										/>
									)}
									{!post?._id && (
										<Avatar
											icon="pi pi-thumbs-up-fill cursor-pointer"
											shape="circle"
											className={`mr-1 ml-3 mb-2 bg-blue-500 text-white
											border-circle`}
											onClick={handleLike}
										/>
									)}
								</div>
								<div
									className={!post?._id ? `${classes.disableInteractions}` : ""}
								>
									{post?._id && (
										<Avatar
											icon="pi pi-bookmark-fill cursor-pointer"
											className={`bg-red-600 ${
												isBookmarked ? "text-blue-900" : "text-white"
											} border-circle`}
											onClick={handleBookmark}
										/>
									)}
									{!post?._id && (
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
										{post && post.likes.length > 0
											? `${post?.likes.length} likes`
											: ""}
									</span>
								</div>
							</div>

							<div className="flex justify-content-even opacity-60 mr-1">
								{showComments ? (
									<Link
										to={`/post/${post?._id}`}
										className="no-underline text-900 flex gap-1 mt-2"
									>
										<span>{post?.comments?.length}</span>
										<span className="hidden md:block">comments</span>
										<CommentIcon className="inline-block md:hidden" />
									</Link>
								) : (
									<span className="flex gap-1">
										<span>{post?.comments?.length}</span>
										<span className="hidden md:block">comments</span>
										<CommentIcon className="inline-block md:hidden" />
									</span>
								)}

								<code>&nbsp;</code>
							</div>
						</div>
					</>
				)}
				{isEditing && (
					<EditPost
						postId={post ? post._id : ""}
						description={description}
						setDescription={setDescription}
						selectedPostImageFile={selectedPostImageFile}
						setSelectedPostImageFile={setSelectedPostImageFile}
						setEditing={setIsEditing}
					/>
				)}
			</div>

			{likesDialogue}
		</>
	);
};

export default Post;
