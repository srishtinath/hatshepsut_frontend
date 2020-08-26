import React from 'react';
import Confetti from 'react-confetti'

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const RightAnswer = () => {

    var settings = {
        dots: false,
        slidesToShow: 1
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
                    <div className="right-text-list">
                        <h3>How did the illustrious Riccardo Bonardi do it?</h3>
                        <ul>
                            <li>As you might have guessed, Riccardo didn't want Tess getting in the way of transporting the treasure back to the British Museum</li>
                            <li>He had let her live as long as she was helping him find the tomb</li>
                            <li>But on the night of the party at Luxos, he found his chance...</li>
                            <li>Seeing the Lady Amelia Sharp exit from Tess's tent, he assumed everyone would be too drunk to remember important clues</li>
                            <li>He discreetly poured the poison he had acquired on the tip of the hookah</li>
                            <li>And discarded the vial in the tomb, in the sand found in one of the rooms</li>
                        </ul>
                    </div>
                    <div className="right-text-list">
                        <h3>What happens next?</h3>
                        <ul>
                            <li>The police arrived in time to capture Riccardo before he could escape</li>
                            <li>The British Museum fired him, opening up a position for your colleague Gael to take up</li>
                            <li>Lady Amelia Sharp realized she had been flirting with her husband's mother, and was appropriately weirded out</li>
                            <li>Atif took over Tess's vacated position in the Cairo University</li>
                            <li>Lord Sharp ended up inheriting his father's entire fortune, and spent his remaining days traveling with his wife.</li>
                        </ul>
                    </div>
                    <div className="right-text-list">
                        <h3>The treasure...</h3>
                        <ul>
                            <li>Queen Hatshepsut comes to you in your dreams, thanking you for solving the puzzle</li>
                            <li>She tells you that the British Museum will strongarm the Egyptian government into keeping the treasure</li>
                            <li>She explains that it's a consequence of European colonialism, but she thanks you nonetheless</li>
                            <li>You return to your university, and relay your adventures in a book</li>
                        </ul>
                    </div>
                    <div>
                        <h1 align="center">Thank you for playing!</h1>
                    </div>
                </Slider>
            </div>
        </div>
     );
}
 
export default RightAnswer;