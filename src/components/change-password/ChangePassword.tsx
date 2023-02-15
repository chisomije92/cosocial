/** @format */

import React from "react";
import * as Yup from "yup";
import { classNames } from "primereact/utils";
import { useFormik } from "formik";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { PasswordValues } from "../../models/password";

const ChangePassword = () => {
	const onSubmit = (values: PasswordValues) => {
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
			oldPassword: "",
			newPassword: "",
		},
		validationSchema: Yup.object({
			oldPassword: Yup.string()
				.min(6, "Minimum of 6 characters required!")
				.required("Required"),
			newPassword: Yup.string()
				.min(6, "Minimum of 6 characters required!")
				.required("Required"),
		}),

		onSubmit,
	});

	const arePasswordsSame = () => {
		return (
			values.newPassword === values.oldPassword &&
			values.oldPassword !== "" &&
			values.newPassword !== "" &&
			!isFormFieldInvalid("oldPassword") &&
			!isFormFieldInvalid("oldPassword")
		);
	};

	type ValueType = "oldPassword" | "newPassword";

	const isFormFieldInvalid = (name: ValueType) =>
		!!(touched[name] && errors[name]);

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
		<div className="card flex justify-content-center mt-3">
			<form
				className="flex flex-column gap-4 p-2"
				onSubmit={handleSubmit}
				onBlur={handleBlur}
			>
				<div className="">
					<Password
						inputId="oldPassword"
						placeholder="Old Password"
						value={values.oldPassword}
						feedback={false}
						onChange={e => {
							setFieldValue("oldPassword", e.target.value);
						}}
						className={`${classNames({
							"p-invalid": isFormFieldInvalid("oldPassword"),
						})}`}
						toggleMask
					/>

					{getFormErrorMessage("oldPassword")}
				</div>
				<div>
					<Password
						inputId="newPassword"
						placeholder="New Password"
						value={values.newPassword}
						feedback={false}
						onChange={e => {
							setFieldValue("newPassword", e.target.value);
						}}
						className={`${classNames({
							"p-invalid": isFormFieldInvalid("newPassword"),
						})}`}
						toggleMask
					/>
					{getFormErrorMessage("newPassword")}
				</div>
				{arePasswordsSame() && (
					<small className="p-error">
						New Password is same as old password!
					</small>
				)}
				<Button
					label="Update"
					type="submit"
					disabled={isSubmitting || !isValid}
				/>
			</form>
		</div>
	);
};

export default ChangePassword;
