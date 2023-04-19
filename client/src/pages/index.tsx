import { Grid, Box, Typography, Button, Container } from '@mui/material';
import { Banner } from '@/components/banner';
//import { Product } from '@/components/product';
import { Layout } from '@/layouts';
import axios from 'axios';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { IProduct, IBrand, ICategory } from '@/interfaces';
import { IProductProps } from '@/components/product';
import { useState } from 'react';
interface Props {
  products?: IProduct[];
}

const Product = dynamic<IProductProps>(
  () => import('@/components/product').then((mod) => mod.Product),
  {
    ssr: false,
  }
);

const HomePage: NextPage<Props> = ({ products }) => {
  //const { data: products } = useProductList();
  //if (!products) return <div>Loading...</div>;
  const [options, setOptions] = useState({});
  
  if (!products) return <div>Loading...</div>;
  
  return (
    <Layout>
      <Banner />
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            margin: '2rem 0',
          }}
        >
          Sản phẩm mới nhất
        </Typography>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product._id} item xs={6} md={4} lg={3} spacing={2}>
              <Product product={product} size={300} />
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          sx={{
            color: '#fff',
            backgroundColor: '#000',

            margin: '2rem 0',
            ' &:hover': {
              backgroundColor: '#fff',
              color: '#000',
            },
          }}
        >
          Xem thêm
        </Button>
      </Container>
    </Layout>
  );
};

// getStaticProps vs getServerSideProps
// getStaticProps: build time
// getServerSideProps: request time

export async function getStaticProps() {
  const res = await axios.get(`${process.env.HOST_URL}/api/product`);
  const data = await res.data.data;
  if (!data) {
    return {
      products: [],
    };
  }
  return {
    props: {
      products: data,
    },
  };
}

export default HomePage;
