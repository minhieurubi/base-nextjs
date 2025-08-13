import axios from "axios";

export function getAxiosErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Lỗi hệ thống";
  }
  return "Đã xảy ra lỗi không xác định";
}
