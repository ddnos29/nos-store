import { FC } from 'react';

import Test from '@/components/test/test';
import { Navbar } from '../components/navbar/';

interface LoginLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const LoginLayout: FC<LoginLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Navbar />
      <Test />
      {children}
    </>
  );
};
