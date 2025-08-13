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

export type TRegister = {
  username: string;
  email: string;
  password: string;
}

export type TUser = {
  id: string;
  email: string;
  username: string;
  role: string;
  urlAvatar?: string;
};

export type TAuthResponse = {
  token: string;
  user: TUser;
};