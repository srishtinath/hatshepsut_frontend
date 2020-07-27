import React, { Component } from 'react';
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom';
import { withRouter, Switch, Route } from 'react-router';

import FirstRoom from './FirstRoom'
import Setting from './Setting'
import Rooms from './Rooms'
import GuessCulprit from './GuessCulprit'
import RandomDream from './RandomDream'

class Home extends Component {

    renderHome = () => {
        if (this.props.currentUser){
            return (
                <div className="home-content">
                    <Zoom>
                        <p>Welcome {this.props.currentUser.name}!</p>
                    </Zoom>
                    <button onClick={this.seeIntroduction}>Re-read the introduction</button>
                    <button onClick={this.continueStory}>Continue where you left off...</button>
                    <button onClick={this.logoutUser}>Logout</button>
                    <p></p>
                </div>
            )
        } 
    }

    logoutUser = (e) => {
        this.props.logoutUser()
      }

    seeIntroduction = (e) => {
        this.props.history.push('home/setting')
    }

    continueStory = (e) => {
        this.props.history.push('home/rooms')
    }


    renderRandomDream1 = () => {
        this.props.history.push('/dream')
        // this.setNextRoom()
    }

    render() { 
        // setTimeout(this.renderRandomDream1, 4000)
        return ( 
            <div>
                <Switch>
                    <Route path="/home/setting" component={ Setting } />
                    <Route path="/home/room" component = { FirstRoom} />
                    <Route path="/home/rooms" component = { Rooms } />
                    <Route path="/guess" component={ GuessCulprit } />
                    <Route path="/dream" component={ RandomDream } />
                    <Route render = {this.renderHome} />
                </Switch>
            </div>
         );
    }
}

let mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        allRooms: state.allRooms
    }
}
 
export default connect(mapStateToProps)(withRouter(Home));