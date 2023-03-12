export interface User {
  id: string;
  username: string;
  email: string;
  profilePicture: string;
  followers: string[];
  following: string[];
  description: string;
}