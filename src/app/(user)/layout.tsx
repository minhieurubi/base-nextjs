"use client";

import { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import Header from "@/components/header/header";

interface UserLayout {
  children: ReactNode;
}

const UserLayout: FC<UserLayout> = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      {children}
    </Box>
  );
};

export default UserLayout;