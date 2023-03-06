/** @format */

import React from "react";
import { ActionFunctionArgs, useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage = () => {
	const navigate = useNavigate();
	return <LoginForm />;
};

export default LoginPage;

//export const SignUpAction = async ({ request }: ActionFunctionArgs) => {
//	const formData = await request.formData();
//	const values = Object.fromEntries(formData);
//	console.log(values);
//	//window.location.href = "/";

//	try {
//		//call an external API to create a new user account
//	} catch (error) {
//		return { error: "There was an error creating your account." };
//	}
//};
