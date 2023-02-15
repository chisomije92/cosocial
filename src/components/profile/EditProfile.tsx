/** @format */

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import React from "react";
import { Button } from "primereact/button";
import { useFormik } from "formik";

import * as Yup from "yup";
import { classNames } from "primereact/utils";
import { Profile } from "../../models/profile";

const EditProfile = () => {
	const allValuesEmpty = () => {
		return (
			values.image === "" &&
			values.email === "" &&
			values.username === "" &&
			values.desc === ""
		);
	};

	const onSubmit = (values: Profile) => {
		if (isValid) {
			resetForm();
		}
		console.log(values);
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
			image: "",
			username: "",
			email: "",
			desc: "",
		},
		validationSchema: Yup.object({
			image: Yup.string().optional(),
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
		<div className="card flex justify-content-center w-12 m-auto">
			<form
				className="flex flex-column gap-2"
				onBlur={handleBlur}
				onSubmit={handleSubmit}
			>
				<div>
					<FileUpload
						id="image"
						mode="basic"
						url="/api/upload"
						accept="image/*"
						maxFileSize={1000000}
						onSelect={e => {
							setFieldValue("image", e.files[0].name);
						}}
						chooseLabel="Update Picture"
					/>
				</div>
				<div>
					<InputText
						id="email"
						placeholder="Edit email"
						//type="email"
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
