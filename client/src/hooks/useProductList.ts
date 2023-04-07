import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { IProduct } from '@/interfaces/product';

const useProductList = () => {
  const { data, error, isLoading } = useSWR<IProduct[]>(
    `${process.env.HOST_URL}/api/product`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useProductList;
