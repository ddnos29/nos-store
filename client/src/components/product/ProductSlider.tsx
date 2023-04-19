import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Typography, Container } from '@mui/material';
import { Product } from './Product';
import { IProduct } from '@/interfaces';
import { Navigation } from 'swiper';

export interface ProductSliderProps {
  products: IProduct[];
}

export const ProductSlider: FC<ProductSliderProps> = ({ products = [] }) => {
  return (
    <Box>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        navigation={{
          nextEl: '.review-swiper-button-next',
          prevEl: '.review-swiper-button-prev',
        }}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          400: {
            slidesPerView: 2,
          },
          750: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 4,
          },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <Product product={product} size={300} />
          </SwiperSlide>
        ))}
        <i className="icon-arrow-long-right review-swiper-button-next"></i>
        <i className="icon-arrow-long-left review-swiper-button-prev"></i>
      </Swiper>
    </Box>
  );
};
