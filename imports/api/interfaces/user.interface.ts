export interface UserCredentials {
  username: string;
  phone: string;
  password: string;
};

export interface UserProfile {
  phone?: string;
  picture?: string;
  actu?: string;
};

export interface User {
  _id?: string;
  username?: string;
  password?: string;
  profile?: UserProfile;
};