import React, { Component } from 'react';
import { connect } from 'react-redux'

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Flash from 'react-reveal/Flash';
import Slide from 'react-reveal/Slide';

import { setCurrentRoom } from '../actions/room';

import { withRouter } from 'react-router'

class Setting extends Component {

    handleAdventure = () => {
        this.props.setCurrentRoom(this.props.allRooms[0])
        this.props.history.push('/home/room')
    }

    render() { 
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
            <div className="setting">
                <Slider {...settings}>

                <div className="slide1">
                    {/* <Zoom> */}
                    <div className="slide1-slidecontent">
                        <h2>Welcome Professor {this.props.currentUser.name}!</h2>
                        <img src="https://res.cloudinary.com/dqtw2xfuf/image/upload/v1595610643/Hatshepsut/united-kingdom-elizabeth-ii-euclidean-vector-queen-regnant-png-favpng-HtZdGFqEkkyEeDrexxywm9rCD_pmf6qq.png" alt="Queen of England" className="thequeen" />
                            <Slide top cascade wait={1000}>
                            <ul>
                                <li>Congratulations on your assignment! The Queen of England herself has personally requested you to locate and recover the tomb of Hatshepsut.</li>
                                <li>She's heard about all of the incredible research you've done and your previous expeditions into the Valley of Kings. </li>
                                <li>As the race for renown and riches from Ancient Egypt heats up, she wants England to be at its forefront.</li>
                                <li>With your proven track record, she believes you will be the perfect archaeologist to find the tomb and mummy of the mysterious Queen Hatshepsut.</li>
                            </ul>
                            </Slide>
                    </div>
                    {/* </Zoom> */}
                </div>
                <div className="slide2">
                    <div className="slide2-content">
                    <h2>Meet your fellow travellers</h2>
                        <div className="slide2-div">
                            {this.props.allCharacters.map(character => 
                                <div key={character.id} className="set-char">
                                    <div className="char-description">
                                        <h3>{character.name}</h3>
                                        <p>{character.description}</p>
                                    </div>
                                    <div>
                                        <img src={character.image_url} alt={character.name} className="set-char-img" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="slide3">
                    <Flash count={50}>
                        <div className="indicates-scroll">{'\u21D3'}</div>
                    </Flash>
                    <div className="slide3-slidecontent" >

                        <h2>You've spent a few months in Egypt now...</h2>
                        <ul>
                            <li>You've been getting to know your cohort, and you're getting closer to finding the mummy every day.</li>
                            <li>So far, you've found the entrance to the tomb itself. It was a very lucky discovery, since some people had spent their entire lives looking for it and never finding anything. You, however, found it within the first month.</li>
                            <li>Excavating the entrance, however, took a considerable amount of time, with another month passing as you carefully and painstakingly removed all the dirt.</li>
                            <li>During this time, you became closer and closer to one Tess Ali, head archaeologist from the Egypt museum, until one day, you found yourselves romantically involved.</li>
                            <li>Tess is a beautiful, distinguished, and accomplished woman, hailing from one of the wealthiest and powerful families in Egypt. </li>
                            <li>It was rare to find an extremely accomplished woman in your field, seeing as how difficult it was for women to get ahead, but you didn't doubt that 
                                Tess had deserved every bit of success and acclaim she had received. She was a brilliant scholar, and well-liked by everyone she met.</li>
                            <li>You spend your days in the hot desert fraternizing with your colleagues, engaging in your passion for Ancient Egypt, and occasionally making trips to the nearest city of Luxor.</li>
                            <li>After a couple of months of hard, arduous labor, you finally hit gold! You find the burial chamber of Queen Hatshepsut! It's every bit as beautiful and extravagant as you had imagined it would be,
                                with ornate carvings on the walls, heaps of gold and ornate furniture, and a beautifully embellished sarcophagus in the middle of it all. You found offerings for her to take with her into the after-life, and 
                                what potentially looked like human sacrifices for her use in the afterlife. 
                            </li>
                            <li>In your moment of success, you all decided to take a night off to celebrate this amazing achievement, and made your way over to the nearest town of Luxos, on the other side of the Nile, to partake in some libations.</li>
                        </ul>
                    </div>
                </div>
                <div className="slide4">
                    <div className="slide4-slidecontent">
                        <h2>The next morning... </h2>
                        <ul>
                            <li>Atif, the Egyptian guide who had been helping you translate some of the symbols you found and serving as a liaison with the locals, woke you up frantically.</li>
                            <li>When asked what was the matter, Atif explained that Tess had been found dead in her tent.</li>
                            <li>They didn't know how she had died or who had killed her, but he wanted your help in figuring out.</li>
                            <li>He explained that Luxos was still a lawless town, and the Valley of Kings an anarchic place with no enforcement to come and investigate her death.</li>
                        </ul>

                        <p> What do you plan to do?</p>

                        <button onClick={this.handleAdventure}>Begin your investigation!</button>
                    </div>
                    
                </div>
                </Slider>

            </div>
         );
    }
}

let mapStateToProps = (state) => {
    return {
      allCharacters: state.allCharacters,
      allRooms: state.allRooms,
      currentUser: state.currentUser
    }
  }

let mapDispatchToProps = {
    setCurrentRoom
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Setting));
