import React from 'react';
import './scss/Section3.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

export default function Section3Component(){

    return (
        <section id='section3'>
            <div className="container">
                <div className="title">                    
                    <h2>함께 구매한 상품</h2>
                    <a href="!#">전체보기</a>
                </div>    
                <div className="content">
                    <div className="product-box">
                        <Swiper
                            navigation={{
                                prevEl: '.swiper-button-prev',
                                nextEl: '.swiper-button-next',
                            }}
                            modules={[Navigation]}
                            spaceBetween={20}
                            slidesPerView={5}
                            rewind={true}
                        >        
                            <SwiperSlide><img src="./images/intro/section3/topping1.png" alt="" /></SwiperSlide>
                            <SwiperSlide><img src="./images/intro/section3/topping2.png" alt="" /></SwiperSlide>
                            <SwiperSlide><img src="./images/intro/section3/topping3.png" alt="" /></SwiperSlide>
                            <SwiperSlide><img src="./images/intro/section3/topping4.png" alt="" /></SwiperSlide>
                            <SwiperSlide><img src="./images/intro/section3/topping5.png" alt="" /></SwiperSlide>
                            <SwiperSlide><img src="./images/intro/section3/topping6.png" alt="" /></SwiperSlide>
                            <SwiperSlide><img src="./images/intro/section3/topping7.png" alt="" /></SwiperSlide>
                            <SwiperSlide><img src="./images/intro/section3/topping8.png" alt="" /></SwiperSlide>
                        </Swiper> 
                    </div> 
                    <prevEl className='swiper-button-prev'></prevEl>
                    <nextEl className='swiper-button-next'></nextEl>
                </div> 
            </div>
        </section>
    );
};
