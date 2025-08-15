'use client';

import Box from '@mui/material/Box';
import Header from '@/components/header/header';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
        <p>{t('welcome')}</p>
      </Box>
    </Box>
  );
}
