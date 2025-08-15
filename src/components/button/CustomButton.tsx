import { Button, ButtonProps } from '@mui/material';
import { FC, ReactNode } from 'react';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
}

const CustomButton: FC<CustomButtonProps> = ({ children, sx, ...rest }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: '#1976d2',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#115293',
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
