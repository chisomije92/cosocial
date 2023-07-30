/** @format */
import react, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import classes from "./authForm.module.css";
import { LoginValues } from "../../models/authForm";
import { classNames } from "primereact/utils";
import { Card } from "primereact/card";
import cosocialImg from "../../images/CO-1.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";
import { urlString } from "../../utils/constants/constants";

const LoginForm = () => {
	const { authenticateUser, userId, errorMsg } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(urlString);
	}, []);
	const onSubmit = async (values: LoginValues) => {
		if (isValid) {
			resetForm();
		}

		await authenticateUser(values, false);
	};

	useEffect(() => {
		if (userId) {
			navigate("/");
		}
	}, [userId]);

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
		<div className="flex flex-column m-auto">
			<Card
				className={`${classes.authForm} Card lg:mx-auto my-4 surface-100 ml-8`}
			>
				<div className={`${classes.brandName} flex gap-1 ml-8`}>
					<div className={`${classes.logoContainer} border-1 border-circle`}>
						<img
							alt="logo"
							src={cosocialImg}
							height="40"
							className=" text-red-400"
						></img>
					</div>
					<div className={`mt-1 ${classes.brandName}`}>
						<span className="text-3xl font-bold">COSOCIAL</span>
					</div>
				</div>
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
							autoComplete="off"
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
							autoComplete="off"
						/>
						{getFormErrorMessage("password")}
					</div>

					<Button
						label="Login"
						type="submit"
						className="w-23rem font-bold"
						disabled={isSubmitting || !isValid}
					/>
					<span className="text-center text-red-500">{errorMsg}</span>
					<div className="flex gap-1">
						<span>Not a registered user yet?</span>
						<Link
							to="/sign-up"
							className="no-underline text-primary-600 font-bold"
						>
							Sign up
						</Link>
					</div>
				</form>
			</Card>
		</div>
	);
};

export default LoginForm;
