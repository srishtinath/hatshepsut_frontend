import React, { Component } from 'react';

import Slider from "react-slick";
import { NavLink } from 'react-router-dom';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Welccome = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        autoplay: true,
        pauseOnHover: true,
        useTransform: true
        // slidesToScroll: 1
      };

    return ( 
        <>
        <div className="welcome-div">
        <div className="home-logo-container">
            <img src="https://res.cloudinary.com/dqtw2xfuf/image/upload/v1595988720/Hatshepsut/Hatshepsut_Mystery_Logo_pres9y.png" alt="main-logo" className="home-logo"/>
        </div>
        <div className="game-intro-div">
            <Slider {...settings}>
            <div >
                <div className="home-content">
                    <p>The Hatshepsut Mystery is a murder mystery game.</p>
                </div>
            </div>
            <div>
                <NavLink to="/register">Register</NavLink>    
                <NavLink to="/login">Login</NavLink>    
            </div>
            </Slider>
        </div>
        </div>
            </>
            );
}
 
export default Welccome;