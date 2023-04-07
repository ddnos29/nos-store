import styles from '@/styles/Home.module.css';
import { Navbar } from '@/components/navbar';
import { Banner } from '@/components/banner';
export default function Home() {
  return (
    <>
      <Navbar />
      <Banner />
    </>
  );
}
