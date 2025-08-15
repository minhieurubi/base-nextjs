export type TApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type TProfile = {
  username: string;
  email: string;
  password: string;
  urlAvatar?: string;
};

export type TLogin = {
  email: string;
  password: string;
}

export type TUpdateUserReq = {
  username?: string;
  email?: string;
  password?: string;
  urlAvatar?: string;
  id?: string;
}

export interface UserInfo {
  _id: string;
  email: string;
  username: string;
  role: string;
  urlAvatar?: string;
  password?: string;
}

export type TAuthResponse = {
  token: string;
  user: UserInfo;
};

export interface CloudinarySignatureResponse {
  signature: string;
  api_key: string;
  timestamp: number;
  folder: string;
}

export interface GetUsersParams {
  page?: number;
  perPage?: number;
}

export type TUsers = {
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
  users: Array<UserInfo>;
};
