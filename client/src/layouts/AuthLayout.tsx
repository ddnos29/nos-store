import { FC } from 'react';
import { Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Navbar } from '@/components/navbar';

interface AuthLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: blue[500],
        }}
      >
        {children}
      </Box>
    </>
  );
};
