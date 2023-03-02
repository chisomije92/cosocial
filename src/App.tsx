/** @format */
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
	useNavigate,
} from "react-router-dom";
import { useLayoutEffect, useState, useEffect } from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";

import Home, { loader as homePostsLoader } from "./pages/home/Home";
import RootLayout from "./pages/root-layout/RootLayout";
import ProfilePage from "./pages/profile-page/ProfilePage";
import NotificationsPage from "./pages/notifications-page/NotificationsPage";
import MessagesPage from "./pages/messages-page/MessagesPage";
import ErrorPage from "./pages/error-page/ErrorPage";
import BookmarkPage from "./pages/bookmarks-page/BookmarkPage";
import LoginPage from "./pages/login-page.tsx/LoginPage";
import SignUpPage from "./pages/sign-up-page/SignUpPage";
import SinglePostPage, {
	loader as singlePostLoader,
} from "./pages/single-post-page/SinglePostPage";
import ExplorePage, {
	loader as explorePostsLoader,
} from "./pages/explore-page/ExplorePage";
import ChatPage from "./pages/messages-page/chat-page/ChatPage";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import useLocalStorage from "use-local-storage";

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	//const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
	const [isSignedIn, setIsSignedIn] = useLocalStorage<boolean>(
		"isSignedIn",
		false
	);
	//const navigate = useNavigate();
	//useLayoutEffect(() => {
	//	const timer = setTimeout(() => {
	//		setLoading(false);
	//	}, 200);
	//	return () => {
	//		clearTimeout(timer);
	//	};
	//}, []);
	const signedIn = localStorage.getItem("isSignedIn");
	//useEffect(() => {
	//	//if (signedIn) {
	//	//	setIsSignedIn(!!signedIn);
	//	//	console.log(signedIn);
	//	//}
	//	//setIsSignedIn(true)
	//	//if(isSignedIn){

	//	//}
	//	setTimeout(() => {
	//		setIsSignedIn(true);
	//	}, 8000);
	//}, []);
	const router = createBrowserRouter(
		createRoutesFromElements(
			//<Route
			//	path="/"
			//	errorElement={<ErrorPage />}
			//	element={
			//		<ProtectedRoute isSignedIn={true}>
			//			<RootLayout />
			//		</ProtectedRoute>
			//	}
			//>
			<Route
				path="/"
				errorElement={<ErrorPage onSignOut={() => setIsSignedIn(false)} />}
				element={<RootLayout onSignOut={() => setIsSignedIn(false)} />}
			>
				<Route
					index
					element={
						<ProtectedRoute isSignedIn={isSignedIn}>
							<Home />
						</ProtectedRoute>
					}
					loader={homePostsLoader}
				/>
				<Route
					path="/profile"
					element={
						<ProtectedRoute isSignedIn={isSignedIn}>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/profile/:id"
					element={
						<ProtectedRoute isSignedIn={isSignedIn}>
							<ProfilePage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/notifications"
					element={
						<ProtectedRoute isSignedIn={isSignedIn}>
							<NotificationsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/messages"
					element={
						<ProtectedRoute isSignedIn={isSignedIn}>
							<MessagesPage />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/messages/:id"
					element={
						<ProtectedRoute>
							<ChatPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/bookmarks"
					element={
						<ProtectedRoute isSignedIn={isSignedIn}>
							<BookmarkPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/sign-up"
					element={<SignUpPage onSignUp={() => setIsSignedIn(true)} />}
				/>
				<Route
					path="/login"
					element={
						<>
							{/*<button onClick={() => setIsSignedIn(prev => !prev)}>Change</button>*/}
							<LoginPage
								onLogin={fn => {
									setIsSignedIn(true);
									fn("/");
								}}
							/>
						</>
					}
				/>
				<Route
					path="/post/:id"
					element={
						<ProtectedRoute>
							<SinglePostPage />
						</ProtectedRoute>
					}
					loader={singlePostLoader}
				/>
				<Route
					path="/explore"
					element={
						<ProtectedRoute isSignedIn={isSignedIn}>
							<ExplorePage />
						</ProtectedRoute>
					}
					loader={explorePostsLoader}
				/>
			</Route>
		)
	);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
