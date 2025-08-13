import { deleteCookie, getCookie, setCookie } from "cookies-next";

export const removeCookies = () => {
  deleteCookie('token');
};

export const saveToken = (token: string) => {
  setCookie("token", token, {
    maxAge: 60 * 60 * 24,
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

export const getAccessToken = () => {
  return getCookie("token") || "";
};