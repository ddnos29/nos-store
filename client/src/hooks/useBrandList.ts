import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { IBrand } from '@/interfaces/brand';

const useBrandList = () => {
  const { data, error, isLoading } = useSWR<IBrand[]>(
    `${process.env.HOST_URL}/api/brand`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useBrandList;
