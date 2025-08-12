import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box sx={{ flex: "1 1 50%", height: "100%" }}>
        <Box
          component="img"
          src="https://g1.img-dpreview.com/3ACBE6D011274856888F900E563D7A85.jpg"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Box
        sx={{
          flex: "1 1 50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthLayout;
