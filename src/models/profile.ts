export interface Profile {
  image?: File;
  username?: string;
  email?: string;
  desc?: string
}

export interface ProfileType {
  description: string;
  email: string;
  username: string;
  image: File
}