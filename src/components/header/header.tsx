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
import { Language } from "@/components/languageSwitcher/language";
import { useTranslation } from "react-i18next";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

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
        toast.error(getAxiosErrorMessage(t(`${error}`)));
      }
    })();
  }, [dispatch, t]);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    setIsToken(false);
    removeCookies();
    router.push(ROUTERS.ROOT);
  };

  return (
    <Box sx={{ padding: "16px", height: "64px", display: "flex", justifyContent: 'space-between', gap: "10px" }}>
      <Language />
      {isToken ? (
        <CustomButton
          sx={{ backgroundColor: "#ff6b6b" }}
          onClick={handleLogout}>
          {t('logout')}
        </CustomButton>
      ) : (
        <Box sx={{ display: "flex", gap: "10px" }}>
          <CustomButton sx={{ minWidth: '120px' }} onClick={() => handleNavigation(ROUTERS.AUTH.LOGIN)}>
            {t('login')}
          </CustomButton>
          <CustomButton sx={{ minWidth: '120px' }} onClick={() => handleNavigation(ROUTERS.AUTH.REGISTER)}>
            {t('register')}
          </CustomButton>
        </Box>
      )}
    </Box>
  );
}