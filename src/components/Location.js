import React, { Component } from 'react';
import { connect } from 'react-redux'

import Items from './Items'

class Location extends Component {

    state = { 
        toggleImages: false,
    }


    showImages = (event) => {
        console.log(event.target)
        this.setState({
            toggleImages: !this.state.toggleImages
        })
    }

    render() { 
        return ( 
            <div id={this.props.location.id} onClick={this.showImages}>
                <h1>{this.props.location.name}</h1>
                <img src={this.props.location.image_url} alt={this.props.location.name} className="location-image" onClick={this.showImages}/>
                {this.state.toggleImages ? 
                        < Items items={this.props.location.items}/>
                : null
                }
            </div>
         );
    }
}

let mapStateToProps = (state) => {
    return ({
        currentLocation: state.currentLocation,
    })
}

  
  // mapDispatchToProps is a POJO that will be merged as props to App
 
export default connect(mapStateToProps)(Location);