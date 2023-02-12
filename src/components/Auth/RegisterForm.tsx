/** @format */

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import classes from "./authForm.module.css";
import React from "react";

const RegisterForm = () => {
	return (
		<div className={`${classes.authForm} Card mx-auto my-4`}>
			<form className="flex flex-column gap-2 w-26rem border-1 p-3">
				<div className="font-bold text-2xl">Log In</div>
				<InputText placeholder="Email" className="w-23rem" />
				<Password feedback={false} placeholder="Password" />
				<Button label="Sign up" className="w-23rem font-bold" />
				<div className="flex gap-1">
					<span>Not a registered user yet?</span>
					<Button label="Sign up" className="p-button-secondary p-0" />
				</div>
			</form>
		</div>
	);
};

export default RegisterForm;
