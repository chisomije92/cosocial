export interface ActionUser {
  username: string;
  email: string;
  profilePicture: string;
  _id: string
}


export interface Post {
  _id: string
  userId: string;
  linkedUser: ActionUser;
  description: string;
  image: string;
  likes: ActionUser[];
  comments: Reply[]
  updatedAt: string;
  createdAt: string
}

export interface Reply {
  _id: string;
  comment: string;
  commenter: {
    username: string;
    email: string;
    profilePicture: string;
    userId: string
  }
  dateOfReply: string
  likes: ActionUser[];
}

export interface PostValues { image?: File, post: string }