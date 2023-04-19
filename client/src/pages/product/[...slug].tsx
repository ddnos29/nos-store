import { Layout } from '@/layouts';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { IProduct } from '@/interfaces';
import { ProductSliderProps } from '@/components/product/ProductSlider';
import { GetServerSideProps } from 'next';
import { ProductImage, ProductOption } from '@/components/product';
import { ToggleButtonSizes } from '@/components/product/Test';
import dynamic from 'next/dynamic';

const ProductSlider = dynamic<ProductSliderProps>(
  () => import('@/components/product').then((mod) => mod.ProductSlider),
  {
    ssr: false,
  }
);

interface ProductDeitalPageProps {
  product: IProduct;
  productRelated: IProduct[];
}

const ProductDeitalPage: NextPage<ProductDeitalPageProps> = ({
  product,
  productRelated,
}) => {
  console.log(product);
  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{
          py: 3,
          minHeight: { lg: '110vh', md: '110vh', sm: '130vh', xs: '100vh' },
        }}
      >
        <Box>
          <Grid container spacing={2}>
            {/* Product image */}
            <Grid item xs={12} md={6}>
              <ProductImage images={product.images} />
            </Grid>
            {/* Product option */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" sx={{ mb: 2 }}>
                {product.name}
              </Typography>
              <ProductOption options={product.options} />
              <Box
                sx={{
                  mt: 2,
                }}
              >
                {/* Description */}
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Mô tả sản phẩm
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ mb: 2, whiteSpace: 'pre-line' }}
                >
                  {product.description}
                </Typography>
              </Box>
            </Grid>
            {/* Product related */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Sản phẩm liên quan
              </Typography>
              <ProductSlider products={productRelated} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // get id from params
  const slug: any = ctx.query.slug;
  const id = slug[0].split('-').pop();
  const productRes = await axios.get(
    `${process.env.HOST_URL}/api/product/${id}`
  );

  const productRelatedRes = await axios.get(
    `${process.env.HOST_URL}/api/product/related/${id}`
  );

  if (!productRes.data.data || !productRelatedRes.data.data) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  console.log(id);
  return {
    props: {
      product: productRes.data.data,
      productRelated: productRelatedRes.data.data,
    },
  };
};
export default ProductDeitalPage;
