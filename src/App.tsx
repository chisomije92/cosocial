/** @format */
import {
	createBrowserRouter,
	createRoutesFromElements,
	defer,
	Route,
	RouterProvider,
} from "react-router-dom";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./App.css";

import Home, { loader as homePostsLoader } from "./pages/home/Home";
import RootLayout from "./pages/root-layout/RootLayout";
import ProfilePage, {
	profilePageLoader,
} from "./pages/profile-page/ProfilePage";
import NotificationsPage from "./pages/notifications-page/NotificationsPage";
import MessagesPage from "./pages/messages-page/MessagesPage";
import ErrorPage from "./pages/error-page/ErrorPage";
import BookmarkPage, {
	bookmarksLoader,
} from "./pages/bookmarks-page/BookmarkPage";
import LoginPage from "./pages/login-page.tsx/LoginPage";
import SignUpPage from "./pages/sign-up-page/SignUpPage";
import SinglePostPage, {
	singlePostPageLoader,
} from "./pages/single-post-page/SinglePostPage";
import ExplorePage, {
	loader as explorePostsLoader,
} from "./pages/explore-page/ExplorePage";
import ChatPage from "./pages/messages-page/chat-page/ChatPage";
import ProtectedRoutes from "./components/protected-routes/ProtectedRoutes";
import { AuthLayout } from "./pages/auth-layout/AuthLayout";
import FollowListPage, {
	followListPageLoader,
} from "./pages/follow-list-page/FollowListPage";

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				element={<AuthLayout />}
				errorElement={<ErrorPage />}
				loader={() => {
					const user = localStorage.getItem("authUser");
					return user;
				}}
			>
				<Route path="/" element={<RootLayout />}>
					<Route element={<ProtectedRoutes />}>
						<Route index element={<Home />} loader={homePostsLoader} />
						<Route
							path="/explore"
							element={<ExplorePage />}
							loader={explorePostsLoader}
						/>
						<Route
							path="/profile"
							element={<ProfilePage />}
							loader={profilePageLoader}
						/>
						<Route
							path="/profile/:id"
							element={<ProfilePage />}
							loader={profilePageLoader}
						/>
						<Route
							path="/profile/:id/:follow"
							element={<FollowListPage />}
							loader={followListPageLoader}
						/>
						<Route path="/notifications" element={<NotificationsPage />} />
						<Route path="/messages" element={<MessagesPage />}></Route>
						<Route path="/messages/:id" element={<ChatPage />} />

						<Route
							path="/bookmarks"
							element={<BookmarkPage />}
							loader={bookmarksLoader}
						/>
						<Route
							path="/post/:id"
							element={<SinglePostPage />}
							loader={singlePostPageLoader}
						/>
					</Route>{" "}
					<Route path="/sign-up" element={<SignUpPage />} />
					<Route path="/login" element={<LoginPage />} />
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
