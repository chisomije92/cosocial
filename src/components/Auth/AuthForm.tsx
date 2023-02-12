/** @format */
import React from "react";
import { InputText } from "primereact/inputtext";

import { Password } from "primereact/password";
import classes from "./authForm.module.css";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useFormik } from "formik";

const AuthForm = () => {
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
		},
		onSubmit: values => {
			console.log(formik.values);
		},
	});
	return (
		<Card className={`${classes.authForm} Card mx-auto my-4`}>
			<form
				className="flex flex-column gap-2 w-26rem p-3"
				onSubmit={formik.handleSubmit}
			>
				<div className="font-bold text-3xl">Sign Up</div>
				<InputText
					placeholder="Username"
					className="w-23rem"
					value={formik.values.username}
					onChange={e => {
						formik.setFieldValue("username", e.target.value);
					}}
				/>
				<InputText
					placeholder="Email"
					className="w-23rem"
					value={formik.values.email}
					onChange={e => {
						formik.setFieldValue("email", e.target.value);
					}}
				/>
				<Password
					feedback={false}
					placeholder="Password"
					value={formik.values.password}
					onChange={e => {
						formik.setFieldValue("password", e.target.value);
					}}
				/>
				<Button
					label="Sign up"
					className="w-23rem font-bold my-2"
					type="submit"
				/>
				<div className="flex gap-1">
					<span>Registered Already?</span>

					<a href="#/" className="no-underline">
						Log in
					</a>
				</div>
			</form>
		</Card>
	);
};

export default AuthForm;
