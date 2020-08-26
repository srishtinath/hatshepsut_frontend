import React from 'react';
import Confetti from 'react-confetti'

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const RightAnswer = () => {

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
        <div className="right-answer">
            <Confetti
            numberOfPieces={200}
            />
            <h1>You got it right!</h1>
            <h2>Congratulations! You figured it out! The ghost of Professor Tess Ali, 
                your friend, lover, confidant in this journey can now be laid to rest.</h2>
            
            <div className="right-text home-content">            
                <Slider {...settings}>
                    <div>
                        <p>How did he do it?</p>
                    </div>
                    <div>
                        <p>What will happen to the treasure now?</p>
                    </div>
                    <div>
                        <p>The fate of the rest...</p>
                    </div>
                </Slider>
            </div>
        </div>
     );
}
 
export default RightAnswer;