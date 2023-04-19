import { FC, useState, useEffect } from 'react';
import { Container, Box, Grid, Typography } from '@mui/material';
import { Pagination } from '@mui/lab';
import { Layout } from '@/layouts';
import {
  IProduct,
  ICategory,
  IBrand,
  IFilter,
  IProductOption,
} from '@/interfaces';
import dynamic from 'next/dynamic';
import axios from '@/lib/axios';
import { Filter } from '@/components/filter';
import { IProductProps } from '@/components/product';
import { usePagination } from '@/hooks/usePagination';

interface Props {
  products?: IProduct[];
  categories?: ICategory[];
  brands?: IBrand[];
}

const Product = dynamic<IProductProps>(
  () => import('@/components/product').then((mod) => mod.Product),
  {
    ssr: false,
  }
);

const ProductPage: FC<Props> = ({ products, categories, brands }) => {
  const [filter, setFilter] = useState<IFilter>({
    category: [],
    brand: [],
    color: [],
    size: [],
    gender: '',
  });
  const [page, setPage] = useState(1);
  const [productFilter, setProductFilter] = useState<IProduct[]>([]);

  const count = Math.ceil(productFilter.length / 12);
  const _DATA = usePagination(productFilter, 12);

  if (!products || !categories || !brands) return <div>Loading...</div>;

  useEffect(() => {
    const productsF = products.filter((product) => {
      // filter category
      if (
        filter.category.length > 0 &&
        !filter.category.includes(product.category._id)
      )
        return false;
      // filter brand
      if (filter.brand.length > 0 && !filter.brand.includes(product.brand._id))
        return false;
      // filter color
      if (
        filter.color.length > 0 &&
        !product.options
          .map((option: IProductOption) => option.color)
          .some((color: string) => filter.color.indexOf(color) >= 0)
      )
        return false;
      // filter size
      if (
        filter.size.length > 0 &&
        !product.options
          .map((option: IProductOption) => option.size)
          .some((size: string) => filter.size.indexOf(size) >= 0)
      )
        return false;

      if (filter.gender === 'Chung') return true;
      //filter gender
      if (!(filter.gender === product.gender) && product.gender !== 'Chung')
        return false;

      return true;
    });
    setProductFilter(productsF);
  }, [filter]);

  const getFilter = ({ category, brand, color, size, gender }: IFilter) => {
    setFilter({ category, brand, color, size, gender });
  };
  const handlePageChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <Layout>
      <Box
        sx={{
          maxWidth: '1400px',
          margin: '2rem auto',
          padding: '0 1rem',
        }}
      >
        <Grid container spacing={2}>
          <Grid item lg={3}>
            <Filter
              categories={categories}
              brands={brands}
              getFilter={getFilter}
            />
          </Grid>

          <Grid item lg={9}>
            <Grid container spacing={3}>
              {_DATA.currentData().map((product) => (
                <Grid
                  key={product._id}
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={4}
                  spacing={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Product product={product} size={300} />
                </Grid>
              ))}
            </Grid>
            {_DATA.currentData().length === 0 ? (
              <Typography variant="h5" sx={{ textAlign: 'center', marginTop:'1rem' }}>
                Không tìm thấy sản phẩm phù hợp
              </Typography>
            ) : (
              <Pagination
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  margin: '1rem 0',
                }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export async function getStaticProps() {
  const products = await axios.get(`${process.env.HOST_URL}/api/product`);
  /*  const products = await res.data.data; */

  const categories = await axios.get(`${process.env.HOST_URL}/api/category`);
  const brands = await axios.get(`${process.env.HOST_URL}/api/brand`);

  if (!products.data.data || !categories.data.data || !brands.data.data) {
    return {
      products: [],
      categories: [],
      brands: [],
    };
  }
  console.log(products.data.data);
  return {
    props: {
      products: products.data.data,
      categories: categories.data.data,
      brands: brands.data.data,
    },
  };
}
export default ProductPage;
