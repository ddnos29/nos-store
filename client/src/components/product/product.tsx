import { FC, useState } from 'react';
import {
  Card,
  Box,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Button,
} from '@mui/material';

import Link from 'next/link';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

import { IProduct } from '@/interfaces';

export interface IProductProps {
  product?: IProduct;
  size: number;
}

export const Product: FC<IProductProps> = ({ product, size }) => {
  const [swiper, setSwiper] = useState<any>(null);
  const [swiper2, setSwiper2] = useState<any>(null);

  const responsiveHeight = {
    minHeight: {
      xs: `${size}px`,
      sm: `${size + 150}px`,
      md: `${size + 150}px`,
      lg: `${size + 150}px`,
    },
    maxHeight: {
      xs: `${size + 150}px`,
      lg: `${size + 200}px`,
    },
  };

  const nexto = () => {
    swiper?.slideNext(700);
    swiper2?.slideNext(700);
  };

  const prev = () => {
    swiper?.slidePrev(700);
    swiper2?.slidePrev(700);
  };
  return (
    <Card
      onMouseEnter={nexto}
      onMouseLeave={prev}
      sx={{
        /*         maxHeight: `${size + 250}px`, */
        /* maxWidth: '100%',
        maxHeight: `${size + 250}px`, */
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
        position: 'relative',
      }}
    >
      <Link href={`/product/${product?.slug}`}>
        <CardActionArea sx={{ position: 'relative' }}>
          {/* Image slider */}
          <Swiper
            speed={700}
            slidesPerView={1}
            allowTouchMove={false}
            onSwiper={(s) => setSwiper(s)}
          >
            <SwiperSlide>
              <CardMedia
                component="img"
                image={product?.images[0]?.image_url}
                title={product?.name}
                sx={{
                  ...responsiveHeight,
                  width: '100%',
                  objectFit: 'cover',
                }}
              ></CardMedia>
            </SwiperSlide>
            {product?.images[1] && (
              <SwiperSlide>
                <CardMedia
                  component="img"
                  image={product?.images[1]?.image_url}
                  title={product?.name}
                  sx={{
                    ...responsiveHeight,
                    width: '100%',
                    objectFit: 'cover',
                  }}
                ></CardMedia>
              </SwiperSlide>
            )}
          </Swiper>
          {/* price slider */}
          <Swiper
            direction={'vertical'}
            speed={700}
            slidesPerView={1}
            allowTouchMove={false}
            onSwiper={(s) => setSwiper2(s)}
            spaceBetween={0}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              height: '10%',
              opacity: 0.8,
            }}
          >
            <SwiperSlide>
              <Box
                sx={{
                  background: 'transparent linear-gradient( #002, #000 100%)',
                  height: '110%',
                  color: '#fff',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography>{product?.price.toLocaleString()} ₫</Typography>
              </Box>
            </SwiperSlide>
            <SwiperSlide>
              <Button
                variant="contained"
                sx={{
                  height: '100%',
                  width: '100%',
                  color: '#fff',
                  backgroundColor: '#000',
                  ' &:hover': {
                    backgroundColor: '#fff',
                    color: '#000',
                  },
                }}
              >
                Mua ngay
              </Button>
            </SwiperSlide>
          </Swiper>
        </CardActionArea>
        {/* <CardContent>
        <Typography
          sx={{
            whiteSpace: 'pre-line',
          }}
        >
          {product?.description}
          </Typography>
        </CardContent> */}
      </Link>
    </Card>
  );
};
