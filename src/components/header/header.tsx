import Box from "@mui/material/Box";
import CustomButton from "@/components/button/CustomButton";
import { useRouter } from "next/navigation";
import { ROUTERS } from "@/constants/routers";
import { getAccessToken, removeCookies } from "@/ultis/cookie";
import { useEffect, useState } from "react";
import { userApi } from "@/services/api";
import { toast } from "react-toastify";
import { getAxiosErrorMessage } from "@/helper/common";
import { setUserInfo } from "@/lib/slices/userSlice";
import { useDispatch } from "react-redux";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isToken, setIsToken] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const token = getAccessToken();
      setIsToken(!!token);

      if (!token) return;

      try {
        const res = await userApi.getUserInfo();
        dispatch(setUserInfo(res.data));
      } catch (error) {
        toast.error(getAxiosErrorMessage(error));
      }
    })();
  }, [dispatch]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    setIsToken(false);
    removeCookies();
    router.push(ROUTERS.ROOT);
  };

  return (
    <Box sx={{ padding: "16px", height: "64px", display: "flex", justifyContent: 'flex-end', gap: "10px" }}>
      {isToken ? (
        <CustomButton onClick={handleLogout}>Logout</CustomButton>
      ) : (
        <>
          <CustomButton onClick={() => handleNavigation(ROUTERS.AUTH.LOGIN)}>Login</CustomButton>
          <CustomButton onClick={() => handleNavigation(ROUTERS.AUTH.REGISTER)}>Register</CustomButton>
        </>
      )}
    </Box>
  );
}