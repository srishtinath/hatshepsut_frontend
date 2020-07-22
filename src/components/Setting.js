import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { NavLink } from 'react-router-dom'

class Setting extends Component {

    render() { 
        var settings = {
            dots: true,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            autoplay: true,
            pauseOnHover: true,
            useTransform: true
            // slidesToScroll: 1
          };
        return ( 
            <div className="setting-content">
                <Slider {...settings}>

                <div className="slide1">
                    <div className="slide1-content">
                        <h2>Welcome!</h2>
                        <p>Congratulations on your posting! The Queen of England herself has personally requested you to locate and recover the tomb of Hatshepsut.</p>
                    </div>
                </div>
                <div className="slide2">
                    <div className="slide2-content">
                    <h2>Meet your fellow travellers</h2>
                    <ul>
                        <li>Atif Aslam, your guide to Egyptian culture and history</li>
                        <li>Lebanese model/actress</li>
                        <li>Rich couple on a "weekend getaway"</li>
                        <li>Head of the British Museum's Egyptology department</li>
                        <li>Professor of Archaeology from Cambridge, colleague of yours</li>
                    </ul>
                    </div>
                </div>
                <div className="slide3">
                    <div className="slide3-content">
                        <h2>Have been in Egypt for a few months... this is what you've learned about the tomb</h2>
                    </div>
                </div>
                <div className="slide4">
                    <div className="slide4-content">
                        <h2>Late one morning...</h2>
                        
                        <NavLink to="/home/firstroom"><button>Begin your adventure!</button></NavLink>
                    </div>
                    
                </div>
                </Slider>

            </div>
         );
    }
}
 
export default Setting;
