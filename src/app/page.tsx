import Box from '@mui/material/Box';
import Header from "@/components/header/header";

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', }}>
      <Header />
      <Box>main</Box>
    </Box>
  );
}
