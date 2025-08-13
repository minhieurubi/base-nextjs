import Box from "@mui/material/Box";
import CustomButton from "@/components/button/CustomButton";
import { useRouter } from "next/navigation";
import { ROUTERS } from "@/constants/routers";
import { getAccessToken, removeCookies } from "@/ultis/cookie";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isToken, setIsToken] = useState<boolean>(false);

  useEffect(() => {
    setIsToken(!!getAccessToken());
  }, []);

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