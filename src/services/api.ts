import baseApi from "@/ultis/baseApi";
import { API_ROUTES } from "@/constants/routers";
import { TApiResponse, TLogin, TAuthResponse, TRegister } from "@/types/common";

export const userApi = {
  login: async (data: TLogin): Promise<TApiResponse<TAuthResponse>> => {
    return await baseApi.post(API_ROUTES.AUTH.LOGIN, data);
  },
  register: async (data: TRegister): Promise<TApiResponse<TAuthResponse>> => {
    return await baseApi.post(API_ROUTES.AUTH.REGISTER, data);
  },
};
