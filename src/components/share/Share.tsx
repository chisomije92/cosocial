/** @format */

import { InputText } from "primereact/inputtext";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import classes from "./share.module.css";
import { Button } from "primereact/button";
import LabelIcon from "@mui/icons-material/Label";
import RoomIcon from "@mui/icons-material/Room";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Avatar } from "primereact/avatar";
import { InputTextarea } from "primereact/inputtextarea";

export default function Share() {
	return (
		<div
			className={`card ${classes.container}  h-13rem xl:h-12rem w-full border-round-md shadow-4 min-w-min`}
		>
			<div className="flex gap-0 -ml-3">
				<Avatar
					image="/assets/person/1.jpeg"
					size="large"
					shape="circle"
					className="mx-4 -mb-2 mt-2"
				/>
				<InputTextarea
					placeholder="Share your thoughts"
					className="border-0 mt-1 -ml-3 w-10  h-5rem"
					rows={8}
					cols={30}
					autoResize
				/>
			</div>
			<hr className="w-11 mr-1 lg:mr-4 mt-2 surface-300 opacity-30" />
			<div
				className={`${classes.options} ml-4 mt-2  flex flex-column xl:flex-row flex-wrap gap-5 sm:gap-3`}
			>
				<div className="flex">
					<div className="mr-3 flex">
						<PermMediaIcon className="mx-1 text-red-400" />
						<span>Media</span>
					</div>
					<div className="md:mr-5 mr-0 flex">
						<EmojiEmotionsIcon className="mx-1 text-yellow-500" />
						<span>Feelings</span>
					</div>
					<div className=" md:mr-5 mr-0 flex">
						<LabelIcon className="mx-1 text-blue-500" />
						<span>Tag</span>
					</div>
					<div className="md:mr-7 mr-3 flex">
						<RoomIcon className="mx-1 text-green-600" />
						<span>Location</span>
					</div>
				</div>
				<Button label="Post" className="w-min p-button-success ml-0 py-1" />
			</div>
		</div>
	);
}
