import baseApi from "@/ultis/baseApi";
import { API_ROUTES } from "@/constants/routers";
import { TApiResponse, TLogin, TAuthResponse, TUpdateUserReq, UserInfo } from "@/types/common";

export const userApi = {
  login: async (data: TLogin): Promise<TApiResponse<TAuthResponse>> => {
    return await baseApi.post(API_ROUTES.AUTH.LOGIN, data);
  },
  register: async (data: TUpdateUserReq): Promise<TApiResponse<TAuthResponse>> => {
    return await baseApi.post(API_ROUTES.AUTH.REGISTER, data);
  },
  getUserInfo: async (): Promise<TApiResponse<UserInfo>> => {
    return await baseApi.get(API_ROUTES.USER);
  },
  updateUserInfo: async (data: TUpdateUserReq): Promise<TApiResponse<UserInfo>> => {
    return await baseApi.patch(API_ROUTES.USER, data);
  },
  getUsers: async (): Promise<TApiResponse<Array<UserInfo>>> => {
    return await baseApi.get(API_ROUTES.USERS);
  },
};
