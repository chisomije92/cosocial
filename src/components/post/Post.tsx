/** @format */

import classes from "./post.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar } from "primereact/avatar";
import { useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Image } from "primereact/image";

export default function Post() {
	const op = useRef<any>(null);
	return (
		<div className={`card mt-3 ${classes.container} shadow-1 border-round-sm`}>
			<div>
				<div className="flex">
					<Avatar
						image="/assets/person/1.jpeg"
						size="normal"
						shape="circle"
						className="mx-2 my-2"
					/>
					<span className="mx-1 my-2 font-semibold">Chisom Ijeomah</span>
					<span className="mx-1 my-2 font-light text-sm">5 minutes ago</span>
					<i
						className="pi pi-ellipsis-v ml-auto mr-1 my-3  cursor-pointer"
						onClick={e => op.current.toggle(e)}
					></i>
					<OverlayPanel ref={op} className="-mt-2">
						<div className="flex text-blue-400 font-medium cursor-pointer">
							<span>Edit</span> <i className="pi pi-pencil ml-2"></i>
						</div>

						<hr className="h-1 w-6rem -mr-3 -ml-3" />
						<div className="flex text-red-500 font-medium cursor-pointer">
							<span>Delete</span> <i className="pi pi-trash ml-2"></i>
						</div>
					</OverlayPanel>
				</div>
			</div>
			<div className="ml-3 text-700">
				<p>This is a sample post</p>
			</div>
			<div className="">
				<Image
					src="/assets/post/1.jpeg"
					alt="Image"
					width="650"
					className="mx-3"
					preview
				/>
			</div>
			<div className="flex justify-content-between">
				<div>
					<Avatar
						icon="pi pi-thumbs-up-fill"
						shape="circle"
						className="mr-1 ml-3 my-3 bg-blue-500 text-white border-circle"
					/>
					<Avatar
						icon="pi pi-heart-fill"
						className="bg-red-600 text-white border-circle"
					/>
					<span className="opacity-70 text-sm mx-1">
						32 cosocials liked this
					</span>
				</div>
				<div className="flex justify-content-even opacity-60">
					<p className="border-bottom-1 mt-4 border-200">10 comments</p>
					<code>&nbsp;</code>
				</div>
			</div>
		</div>
	);
}
