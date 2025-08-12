import Box from "@mui/material/Box";
import CustomButton from "@/components/button/CustomButton";
import { useRouter } from "next/navigation";
import { ROUTERS } from "@/constants/routers";

export default function Header() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    console.log('logout');
    router.push(ROUTERS.ROOT);
  }

  return (
    <Box sx={{ padding: "16px", height: "64px", display: "flex", justifyContent: 'flex-end', gap: "10px" }}>
      <CustomButton onClick={() => handleNavigation(ROUTERS.AUTH.LOGIN)}>Login</CustomButton>
      <CustomButton onClick={() => handleNavigation(ROUTERS.AUTH.REGISTER)}>Register</CustomButton>
      <CustomButton onClick={handleLogout}>Logout</CustomButton>
    </Box>
  );
}