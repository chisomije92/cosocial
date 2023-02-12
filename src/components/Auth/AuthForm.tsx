/** @format */
import React from "react";
import { InputText } from "primereact/inputtext";

import { Password } from "primereact/password";
import classes from "./authForm.module.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useFormik } from "formik";
import * as Yup from "yup";
import { classNames } from "primereact/utils";
import { RegisterValues } from "../../models/authForm";

const AuthForm = () => {
	const onSubmit = (values: RegisterValues) => {
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
		handleChange,
		handleSubmit,
		resetForm,
		setFieldValue,
	} = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.min(4, "Minimum of 4 characters required!")
				.max(15, "Characters must be less than 15!")
				.required("Required"),
			email: Yup.string()
				.email("Input a valid email address!")
				.required("Required"),
			password: Yup.string()
				.min(6, "Minimum of 6 characters required!")
				.required("Required"),
		}),
		onSubmit,
	});

	type ValueType = "username" | "email" | "password";

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

	const isAllFieldTouched = () => {
		const inputValues: ValueType[] = ["username", "email"];
		return inputValues.every(val => touched[val]);
	};

	return (
		<Card
			className={`${classes.authForm} Card lg:mx-auto my-4 surface-100 ml-8`}
		>
			<form
				className="flex flex-column gap-2 w-26rem p-3"
				onSubmit={handleSubmit}
				onBlur={handleBlur}
			>
				<div className="font-bold text-3xl">Sign Up</div>
				<div>
					<InputText
						id="username"
						name="username"
						placeholder="Username"
						value={values.username}
						onChange={e => {
							setFieldValue("username", e.target.value);
						}}
						className={`${classNames({
							"p-invalid": isFormFieldInvalid("username"),
						})} w-23rem`}
					/>
					{getFormErrorMessage("username")}
				</div>
				<div>
					<InputText
						id="email"
						name="email"
						placeholder="Email"
						value={values.email}
						type="email"
						onChange={e => {
							setFieldValue("email", e.target.value);
						}}
						className={`${classNames({
							"p-invalid": isFormFieldInvalid("email"),
						})} w-23rem`}
					/>
					{getFormErrorMessage("email")}
				</div>

				<div>
					<Password
						id="password"
						name="password"
						feedback={false}
						placeholder="Password"
						value={values.password}
						onChange={e => {
							setFieldValue("password", e.target.value);
						}}
						className={`${classNames({
							"p-invalid": isFormFieldInvalid("password"),
						})} w-23rem`}
					/>
					{getFormErrorMessage("password")}
				</div>

				<Button
					label="Sign up"
					disabled={isSubmitting || !isValid || !isAllFieldTouched()}
					className="w-23rem font-bold my-2"
					type="submit"
				/>
				<div className="flex gap-1">
					<span>Registered already?</span>

					<a href="#/" className="no-underline">
						Log in
					</a>
				</div>
			</form>
		</Card>
	);
};

export default AuthForm;
