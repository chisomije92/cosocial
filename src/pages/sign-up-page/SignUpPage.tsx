/** @format */

import React from "react";
import AuthForm from "../../components/Auth/AuthForm";

const SignUpPage: React.FC<{ onSignUp: () => void }> = ({ onSignUp }) => {
	return (
		<>
			<AuthForm onSignUp={onSignUp} />
		</>
	);
};

export default SignUpPage;
