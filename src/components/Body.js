import React, { Component } from 'react';
import FirstRoom from './FirstRoom';
import Setting from './Setting'
import Home from './Home'

import {Switch, Route, withRouter} from 'react-router-dom'


class Body extends Component {

    state = {
        rooms: [{
            name: "",
            image_url: "",
            locations: []
        }]
    }

    componentDidMount(){
        fetch("http://localhost:3000/rooms")
        .then(r => r.json())
        .then(fetchedRooms => {
            this.setState({
                rooms: fetchedRooms
            })
        })
    }

    renderHome = () => {
        return <Home />
    }

    firstRoom = () => {
        return <FirstRoom room={this.state.rooms[0]}/>
    }

    render() { 
        // console.log(this.state.rooms[0])
        // let firstRoom = this.props.rooms[0]
        return ( 
            <div className="body-content">
                {/* This is the body div! */}
                <Switch>
                    <Route path="/home" render={this.renderHome} />
                    <Route path="/setting" component={ Setting } />

                {/* <Route path="/register" render={ this.renderForm } />
                <Route path="/profile" render={this.renderProfile}/> */}
                    <Route path="/firstroom" render = {this.firstRoom} />
                    <Route render={this.renderHome} />
                </Switch>
            </div>
         );
    }
}
 
export default withRouter(Body);