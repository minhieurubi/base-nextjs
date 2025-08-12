"use client";

import Box from '@mui/material/Box';
import Header from "@/components/header/header";

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
      <Header />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        WELCOME
      </Box>
    </Box>
  );
}
