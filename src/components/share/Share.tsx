/** @format */

import PermMediaIcon from "@mui/icons-material/PermMedia";
import classes from "./share.module.css";
import { Button } from "primereact/button";
import LabelIcon from "@mui/icons-material/Label";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Avatar } from "primereact/avatar";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

export default function Share() {
	const [inputText, setInputText] = useState("");
	const [selectedFile, setSelectedFile] = useState<File>();

	const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSelectedFile(event?.target?.files?.[0]);
	};

	const onSubmitPost = () => {
		console.log({
			inputText,
			selectedFile,
		});
	};

	return (
		<div
			className={`card ${classes.container}  h-13rem xl:h-12rem w-full border-round-md shadow-4`}
		>
			<div className="flex gap-0 -ml-3 ">
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
					value={inputText}
					onChange={e => setInputText(e.target.value)}
				/>
			</div>
			<hr className="w-11 mr-1 lg:mr-4 mt-2 surface-300 opacity-30" />
			<div
				className={`${classes.options} ml-4 mt-2  flex flex-column xl:flex-row flex-wrap gap-5 sm:gap-3`}
			>
				<div className="flex gap-2 mt-1">
					<div className=" flex">
						<label htmlFor="imageInput" className="flex cursor-pointer">
							<PermMediaIcon className="mx-1 text-red-400" />
							<span className="hidden md:inline">Media</span>
							<input id="imageInput" type="file" onChange={handleFileSelect} />
						</label>
					</div>
					<div className=" flex">
						<EmojiEmotionsIcon className="mx-1 text-yellow-500" />
						<span className="hidden md:inline">Feelings</span>
					</div>
					<div className="  flex">
						<LabelIcon className="mx-1 text-blue-500" />
						<span className="hidden md:inline">Tag</span>
					</div>
				</div>
				<Button
					label="Post"
					className="w-min p-button-success ml-0 mt-1 py-1 ml-auto mr-4 font-bold"
					onClick={onSubmitPost}
				/>
			</div>
		</div>
	);
}
