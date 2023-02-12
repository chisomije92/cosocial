/** @format */

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import classes from "./authForm.module.css";
import { LoginValues } from "../../models/authForm";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";

const LoginForm = () => {
	const onSubmit = (values: LoginValues) => {
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
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Input a valid email address!")
				.required("Required"),
			password: Yup.string()
				.min(6, "Minimum of 6 characters required!")
				.required("Required"),
		}),
		onSubmit,
		validateOnChange: true,
		validateOnBlur: true,
	});
	type ValueType = "email" | "password";

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
		<Card
			className={`${classes.authForm} Card lg:mx-auto my-4 surface-100 ml-8`}
		>
			<form
				className="flex flex-column gap-2 w-26rem  p-3"
				onSubmit={handleSubmit}
				onBlur={handleBlur}
			>
				<div className="font-bold text-3xl ">Log In</div>
				<div>
					<InputText
						id="email"
						name="email"
						placeholder="Email"
						value={values.email}
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
						value={values.password}
						placeholder="Password"
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
					className="w-23rem font-bold"
					disabled={isSubmitting || !isValid || !touched.email}
				/>
				<div className="flex gap-1">
					<span>Not a registered user yet?</span>
					<a href="#/" className="no-underline">
						Sign up
					</a>
				</div>
			</form>
		</Card>
	);
};

export default LoginForm;
