/** @format */
import {
	createBrowserRouter,
	createRoutesFromElements,
	defer,
	Route,
	RouterProvider,
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
import ProtectedRoutes from "./components/protected-routes/ProtectedRoutes";
import { AuthLayout } from "./components/auth-layout/AuthLayout";

function App() {
	const [loading, setLoading] = useState<boolean>(true);

	//useLayoutEffect(() => {
	//	const timer = setTimeout(() => {
	//		setLoading(false);
	//	}, 200);
	//	return () => {
	//		clearTimeout(timer);
	//	};
	//}, []);

	const getAuthStatus = () =>
		new Promise(resolve =>
			setTimeout(() => {
				const user = localStorage.getItem("isAuth");
				resolve(user);
			}, 3000)
		);

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				element={<AuthLayout />}
				errorElement={<ErrorPage />}
				loader={() => defer({ authPromise: getAuthStatus() })}
			>
				<Route path="/" element={<RootLayout />}>
					<Route index element={<Home />} loader={homePostsLoader} />
					<Route
						path="/explore"
						element={<ExplorePage />}
						loader={explorePostsLoader}
					/>
					<Route element={<ProtectedRoutes />}>
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/profile/:id" element={<ProfilePage />} />

						<Route path="/notifications" element={<NotificationsPage />} />
						<Route path="/messages" element={<MessagesPage />}></Route>
						<Route path="/messages/:id" element={<ChatPage />} />

						<Route path="/bookmarks" element={<BookmarkPage />} />
						<Route
							path="/post/:id"
							element={<SinglePostPage />}
							loader={singlePostLoader}
						/>
					</Route>

					<Route path="/sign-up" element={<SignUpPage />} />
					<Route
						path="/login"
						element={
							<>
								{/*<button onClick={() => setIsSignedIn(prev => !prev)}>Change</button>*/}
								<LoginPage />
							</>
						}
					/>
				</Route>
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
