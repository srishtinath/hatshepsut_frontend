import React, { Component } from 'react';
import { connect } from 'react-redux'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
                    <div className="slide2-div">
                        {this.props.allCharacters.map(character => 
                            <div key={character.id} className="set-char">
                                {character.name}
                                <img src={character.image_url} alt={character.name} className="set-char-img" />
                            </div>
                        )}
                        {/* <li>Atif Mostafa, your guide to Egyptian culture and history</li>
                        <li>Lebanese model/actress</li>
                        <li>Rich couple on a "weekend getaway"</li>
                        <li>Head of the British Museum's Egyptology department</li>
                        <li>Professor of Archaeology from Cambridge, colleague of yours</li> */}
                    </div>
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

                        <button onClick={this.handleAdventure}>Begin your adventure!</button>
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
      allRooms: state.allRooms
    }
  }

let mapDispatchToProps = {
    setCurrentRoom
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Setting));
