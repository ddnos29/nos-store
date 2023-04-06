import { FC } from 'react';
import { Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import { Navbar } from '@/components/navbar';

interface DefaultLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
