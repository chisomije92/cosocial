/** @format */

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import * as Yup from "yup";
import { classNames } from "primereact/utils";
import { Profile } from "../../models/profile";
import classes from "./profile.module.css";

const EditProfile = () => {
	const [selectedImageFile, setSelectedImageFile] = React.useState<{
		preview: string;
		data: File | null;
		text: string | null;
	}>({ preview: "", data: null, text: null });

	const allValuesEmpty = () => {
		return (
			!values.image &&
			values.email === "" &&
			values.username === "" &&
			values.desc === ""
		);
	};

	type requestObjType = {
		description?: string;
		image?: string;
		username?: string;
		email?: string;
	};

	const onSubmit = (values: Profile) => {
		const requestObj: requestObjType = {};
		if (isValid) {
			setFieldValue("image", undefined);

			resetForm();
		}
		if (values.desc !== "") {
			requestObj["description"] = values.desc;
		}

		if (values.email !== "") {
			requestObj["email"] = values.email;
		}

		if (values.username !== "") {
			requestObj["username"] = values.username;
		}

		if (!values.image) {
			requestObj.image = values.image;
		}
		console.log({ ...requestObj, image: values.image });
	};

	const {
		values,
		errors,
		touched,
		isSubmitting,
		isValid,
		handleBlur,
		handleSubmit,
		resetForm,
		setFieldValue,
	} = useFormik({
		initialValues: {
			image: undefined,
			username: "",
			email: "",
			desc: "",
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.min(4, "Minimum of 4 characters required!")
				.max(15, "Characters must be less than 15!")
				.optional(),
			email: Yup.string().email("Input a valid email address!").optional(),
			desc: Yup.string().optional(),
		}),

		onSubmit,
	});

	type ValueType = "image" | "username" | "email" | "desc";

	const isFormFieldInvalid = (name: ValueType) => {
		return !!(touched[name] && errors[name] && name.length > 0);
	};

	const getFormErrorMessage = (name: ValueType) => {
		return isFormFieldInvalid(name) ? (
			<div className="flex gap-1 mt-1">
				<i className="pi pi-info-circle p-error"></i>
				<small className="p-error">{errors[name]}</small>
			</div>
		) : (
			<small className="p-error">&nbsp;</small>
		);
	};

	return (
		<div
			className={`${classes.editProfile} card flex justify-content-center w-12 m-auto`}
		>
			<form
				className="flex flex-column gap-2"
				onBlur={handleBlur}
				onSubmit={handleSubmit}
			>
				<div>
					<label
						htmlFor="imageInput"
						className={`${classes.imgInputLabel} flex cursor-pointer`}
					>
						<PermMediaIcon className="mx-1 text-red-400" />
						{!selectedImageFile.text ? (
							<span>Change Profile Picture</span>
						) : (
							<span className="">{selectedImageFile.text}</span>
						)}
						{selectedImageFile.text && (
							<img
								src={selectedImageFile.preview}
								alt=""
								width="20px"
								height="20px"
								className="ml-2 border-round"
							/>
						)}
					</label>
					<input
						id="imageInput"
						type="file"
						onChange={e => {
							let img: {
								preview: string;
								data: File | null;
								text: string | null;
							} = {
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
							setSelectedImageFile(img);

							setFieldValue("image", e?.target?.files?.[0]);
						}}
					/>
					{/*<img src={selectedImageFile.preview} />*/}
				</div>
				<div>
					<InputText
						id="email"
						name="email"
						placeholder="Edit email"
						value={values.email}
						onChange={e => {
							setFieldValue("email", e.target.value);
						}}
						className={`${classNames({
							"p-invalid": isFormFieldInvalid("email"),
						})}`}
					/>
					{getFormErrorMessage("email")}
				</div>
				<div>
					<InputText
						id="username"
						name="username"
						placeholder="Edit username"
						type="text"
						value={values.username}
						onChange={e => {
							setFieldValue("username", e.target.value);
						}}
					/>
					{getFormErrorMessage("username")}
				</div>
				<div>
					<InputTextarea
						id="desc"
						name="desc"
						placeholder="Edit description"
						value={values.desc}
						onChange={e => {
							setFieldValue("desc", e.target.value);
						}}
						autoResize
						className="w-12"
					/>
					{getFormErrorMessage("desc")}
				</div>

				<Button
					label="Update"
					type="submit"
					disabled={allValuesEmpty() || isSubmitting}
				/>
			</form>
		</div>
	);
};

export default EditProfile;
