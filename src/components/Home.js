import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { toggleText: false }
    }

    toggleText = (e) => {
        this.setState({
            toggleText: !this.state.toggleText
        })
    }


    render() { 
        return ( 
            <div onClick={this.toggleText}>
                <Zoom when={this.state.toggleText}>
                Welcome user!
                </Zoom>
            </div>
         );
    }
}
 
export default Home;