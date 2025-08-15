import baseApi from '@/ultis/baseApi';
import { API_ROUTES } from '@/constants/routers';
import {
  TApiResponse,
  TLogin,
  TAuthResponse,
  TUpdateUserReq,
  UserInfo,
  CloudinarySignatureResponse,
  GetUsersParams,
  TUsers,
} from '@/types/common';
import { ROW_PER_PAGE_OPTIONS } from '@/constants/common';

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
  getUsers: async (params: GetUsersParams = {}): Promise<TApiResponse<TUsers>> => {
    const query = new URLSearchParams({
      page: String(params.page || 1),
      perPage: String(params.perPage || ROW_PER_PAGE_OPTIONS[0]),
    });

    return await baseApi.get(`${API_ROUTES.USERS}?${query.toString()}`);
  },
  getSignature: async (data: { folder: string }): Promise<CloudinarySignatureResponse> => {
    return await baseApi.post(API_ROUTES.SIGN_CLOUDINARY_PARAMS, data);
  },
};
