/** @format */

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/auth/useAuth";

let userId: string | null;
const ProtectedRoutes = () => {
	const { authUser } = useAuth();

	//const { userId } = authUser;
	if (authUser) {
		userId = authUser.userId;
	}

	return userId ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
