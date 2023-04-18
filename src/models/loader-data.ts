import { Post } from "./post";
import { User } from "./user";

export interface LoaderData {
  data: {
    userData: User;
    loadedPosts: Post[];
  };
}