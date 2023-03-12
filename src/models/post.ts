export interface PostType {
  id: string
  userId: string;
  description: string;
  image: string;
  likes: string[];
  comments: Reply[]
  updatedAt: string;
  createdAt: string
}

interface Reply {
  id: string;
  comment: string;
  commenterId: string
  dateOfReply: string
  likes: string[];
}