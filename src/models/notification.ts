export interface Notification {
  _id: string;
  actions: string;
  actionUser: {
    email: string;
    username: string;
    profilePicture: string;
    userId: string;
  },
  actionPostId: string;
  read: boolean;
  dateOfAction: string;
}