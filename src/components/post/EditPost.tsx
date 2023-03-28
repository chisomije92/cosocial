/** @format */

import { InputTextarea } from "primereact/inputtextarea";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import React, { useEffect, useState } from "react";
import { Form, useNavigate, useSubmit } from "react-router-dom";
import classes from "./post.module.css";
import { ImageFileType } from "../../models/imageFileType";
import { Button } from "primereact/button";
import { useAuth } from "../../hooks/auth/useAuth";

const EditPost: React.FC<{
	postId: any;
	description: string;
	setDescription: any;
	selectedPostImageFile: any;
	setSelectedPostImageFile: any;
	setEditing: any;
}> = ({
	postId,
	description,
	setDescription,
	selectedPostImageFile,
	setSelectedPostImageFile,
	setEditing,
}) => {
	const { updatePost, isSubmitting, setIsSubmitting, isLoading, setIsLoading } =
		useAuth();

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		let img: ImageFileType = {
			preview: "",
			data: null,
			text: null,
		};
		if (e?.target?.files?.[0]) {
			img = {
				preview: URL.createObjectURL(e.target.files[0]),
				data: e.target.files[0],
				text: e.target.files[0].name,
			};
		}
		setSelectedPostImageFile(img);
	};

	const handleSubmit = () => {
		setIsSubmitting(false);
		setIsLoading(false);
		try {
			if (selectedPostImageFile.data) {
				try {
					updatePost(postId, {
						image: selectedPostImageFile.data,
						post: description,
					});
					setIsSubmitting(true);
					setIsLoading(true);
				} catch (err) {
					throw err;
				}
			} else {
				try {
					updatePost(postId, {
						post: description,
					});
					setIsSubmitting(true);
					setIsLoading(true);
				} catch (err) {
					throw err;
				}
			}
		} catch (err) {
			throw err;
		}
	};
	return (
		<>
			<div className="ml-3 text-700">
				<InputTextarea
					value={description}
					onChange={e => setDescription(e.target.value)}
					rows={5}
					cols={30}
					autoResize
					className=" mt-1 w-10  h-5rem"
					name="description"
					id="description"
				/>
			</div>
			<div className="flex mx-auto flex-column">
				<div className="mx-auto">
					<span className="opacity-60 text-lg ">Select Media</span>
				</div>
				<label htmlFor="image" className="flex cursor-pointer">
					{!selectedPostImageFile.text && (
						<PermMediaIcon className="mx-1 text-red-400 font-bold w-12" />
					)}
					{selectedPostImageFile.text && (
						<div
							className={`
									${classes.postImgContainer}
									 flex mx-auto flex-column align-items-center`}
						>
							<img
								src={selectedPostImageFile.preview}
								alt=""
								width="50%"
								className="ml-2 border-round"
							/>
						</div>
					)}
					<input
						id="image"
						name="image"
						type="file"
						onChange={handleFileSelect}
					/>
				</label>
			</div>
			<div className="flex justify-content-between gap-2 mb-3">
				<div className="flex gap-1">
					<Button
						type="submit"
						label="Update"
						className={`w-min p-button-success ml-4 mt-1 py-2  font-bold	${
							isLoading ? "p-disabled" : ""
						}`}
						onClick={handleSubmit}
					/>
					<Button
						label="Cancel"
						className={`w-min p-button-danger mt-1 py-2  font-bold 	${
							isLoading ? "p-disabled" : ""
						}`}
						onClick={() => setEditing(false)}
					/>
				</div>
			</div>
		</>
	);
};

export default EditPost;
