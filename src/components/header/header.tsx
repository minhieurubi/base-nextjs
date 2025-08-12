import Box from "@mui/material/Box";
import CustomButton from "@/components/button/CustomButton";

export default function Header() {
  return (
    <Box sx={{ padding: "16px", height: "64px", display: "flex", gap: "10px" }}>
      <CustomButton>Login</CustomButton>
      <CustomButton>Register</CustomButton>
    </Box>
  );
}