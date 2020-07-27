import React, { Component } from 'react';
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom';
import { withRouter, Switch, Route } from 'react-router';

import FirstRoom from './FirstRoom'
import Setting from './Setting'
import Rooms from './Rooms'
import GuessCulprit from './GuessCulprit'

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
    toggleText = (e) => {
        this.setState({
            toggleText: !this.state.toggleText
        })
    }

    logoutUser = (e) => {
        // e.preventDefault()
        this.props.logoutUser()
      }

    seeIntroduction = (e) => {
        this.props.history.push('home/setting')
    }

    continueStory = (e) => {
        this.props.history.push('home/rooms')
    }

    firstRoom = () => {
        return <FirstRoom />
    }


    renderSetting = () => {
        return <Setting />
    }

    seeRooms = () => {
        return <Rooms />
    }

    guessCulprit = () => {
        return <GuessCulprit />
      }
    render() { 
        return ( 
            <div>
                <Switch>
                    <Route path="/home/setting" render={ this.renderSetting } />
                    <Route path="/home/room" render = {this.firstRoom} />
                    <Route path="/home/rooms" render = {this.seeRooms} />
                    <Route path="/guess" render={this.guessCulprit} />
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