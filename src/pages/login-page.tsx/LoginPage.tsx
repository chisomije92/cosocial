/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage = () => {
	const navigate = useNavigate();
	return (
		<>
			<LoginForm />
		</>
	);
};

export default LoginPage;
