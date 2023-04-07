import React from 'react';
import { Box, CardMedia, useMediaQuery } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export const Banner = () => {
  const images = [
    '/images/banner.jpg',
    '/images/banner.jpg',
    '/images/banner4.jpg',
  ];
  return (
    <Box>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        effect={'fade'}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        speed={1500}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Pagination, Navigation]}
        style={{ height: 'auto' }}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <CardMedia
              image={image}
              sx={{
                width: '100%',
                height: { lg: '70vh', md: '50vh', xs: '30vh' },
                objectFit: 'contain',
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
