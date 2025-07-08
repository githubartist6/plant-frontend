import React from "react";
import { Link } from "react-router-dom";
import '../CSS/home.css';
// import plantHero from "../Api/multipalData.json";
import Loading from "../Loding/loding";

import { useAuth } from "../store/auth";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const Home = () => {

    const {
        multipaldata,
        isLoggedIn,
        user,
        isLoading
    } = useAuth();
    const heroData = multipaldata?.message?.[0]?.herosection || [];
    const addressUser = { username: "jkcoder" };

    if (isLoading || heroData.length === 0) {
        return <h2 className="loading"><Loading /></h2>;
    }

    return (
        <section className="home" id="home">
            <div className="home-slider">
                <div className="wrapper">
                    {heroData && heroData.length > 0 && (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation
                            pagination={{ clickable: true }}
                            loop={heroData.length > 1}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            className="mySwiper"
                        >
                            {heroData.map((item, index) => (
                                <SwiperSlide
                                    className="box"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                    key={index}
                                >
                                    <div className="content">
                                        <span>{item.offerTitle}</span>
                                        <h3>{item.title}</h3>
                                        <Link
                                            to={
                                                isLoggedIn
                                                    ? (user?.username === addressUser?.username
                                                        ? "/productList"
                                                        : "/address")
                                                    : "/login"
                                            }
                                            className="btn"
                                        >
                                            {item.buttonText || "shop now"}
                                        </Link>




                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                </div>
            </div>
        </section>
    );
};
