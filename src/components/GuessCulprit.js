import React, { Component } from 'react';
import {withRouter} from 'react-router'

class GuessCulprit extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    goHome = (e) => {
        this.props.history.push('/home')
    }

    render() { 
        return ( 
            <>
            <p>This is the GuessCulprit component</p>
            <button onClick={this.goHome}>Go back home cuz you're probably wrong</button>
            </>
         );
    }
}
 
export default withRouter(GuessCulprit);