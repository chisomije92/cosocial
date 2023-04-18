import { Notification } from './notification';
import { Post } from "./post";

export interface User {
  _id: string;
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  followers: string[];
  following: string[];
  description: string;
  bookmarks: Post[]
  notifications: Notification[]
  updatedAt: string;
  createdAt: string
}

export interface AuthUser {
  token: string;
  userId: string;
  expirationTimer: string;
  loggedInTime: string;
}