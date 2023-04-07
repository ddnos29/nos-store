import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { ICategory } from '@/interfaces/category';
const useCategoryList = () => {
  const { data, error, isLoading } = useSWR<ICategory[]>(
    `${process.env.HOST_URL}/api/category`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
  };
};

export default useCategoryList;
