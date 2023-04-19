import { FC } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export const Layout: FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
