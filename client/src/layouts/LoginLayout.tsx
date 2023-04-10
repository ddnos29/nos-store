import { FC } from 'react';

import { Box, Toolbar, Typography } from '@mui/material';

import Head from 'next/head';

import { SideBar } from '@/components/sidebar/SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface LoginLayoutProps {
  children?: React.ReactNode;
  title?: string;
  drawerWidth?: number;
  pageDescription?: string;
  window?: () => Window;
}

export const LoginLayout: FC<LoginLayoutProps> = ({
  children,
  title,
  drawerWidth,
  pageDescription,
  window,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={pageDescription} />
      </Head>

      <Box sx={{ display: 'flex' }}>
        <SideBar drawerWidth={240} title={title} window={window} />
        {/* main */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${240}px)` },
          }}
        >
          <Toolbar />
          <ToastContainer />

          {children}
        </Box>
      </Box>
    </>
  );
};
