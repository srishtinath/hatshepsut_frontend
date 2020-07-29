import React, { Component } from 'react';
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom';
import { withRouter, Switch, Route } from 'react-router';

import FirstRoom from './FirstRoom'
import Setting from './Setting'
import {Rooms} from './Rooms'
import GuessCulprit from './GuessCulprit'
import RandomDream from './RandomDream'
import Hatshepsut from './Hatshepsut'

class Home extends Component {

    state = {
        showDream: false
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.userRooms.length !== this.props.userRooms.length){
            if (this.props.userRooms.length === 2){
                this.setState({
                    showDream: true
                })
            } else {
                this.setState({
                    showDream: false
                })
            }
        } 
    }
    renderHome = () => {
        if (this.props.currentUser){
            return (
                <>
                <div className="home-content">
                    <Zoom>
                        <p>Welcome {this.props.currentUser.name}!</p>
                    </Zoom>
                    <button onClick={this.seeIntroduction}>Re-read the introduction</button>
                    <button onClick={this.continueStory}>Continue where you left off...</button>
                    <button onClick={this.logoutUser}>Logout</button>
                    <p></p>
                    <Hatshepsut />
                </div>
                
            </>
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

    closeDream = () => {
        this.setState({
            showDream: false
        })
    }

    render() { 
        return ( 
            <div>
                <Switch>
                    <Route path="/home/setting" component={ Setting } />
                    <Route path="/home/room" component = { FirstRoom} />
                    <Route path="/home/rooms" component = { Rooms } />
                    <Route path="/guess" component={ GuessCulprit } />
                    <Route path="/dream" render={ this.renderRandomDream1 } />
                    <Route render = {this.renderHome} />
                </Switch>

                {this.state.showDream ?
                < RandomDream closeDream = {this.closeDream}/>
                :null}

            </div>
         );
    }
}

let mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        allRooms: state.allRooms,
        userRooms: state.userRooms
    }
}
 
export default connect(mapStateToProps)(withRouter(Home));