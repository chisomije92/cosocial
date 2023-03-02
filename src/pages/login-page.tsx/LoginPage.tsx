/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage: React.FC<{
	onLogin: (fn: any) => void;
}> = ({ onLogin }) => {
	const navigate = useNavigate();
	return (
		<>
			<LoginForm onLogin={() => onLogin(navigate)} />
		</>
	);
};

export default LoginPage;
