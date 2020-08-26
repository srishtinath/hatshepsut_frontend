import React, { Component } from 'react';
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom';
import { withRouter, Switch, Route } from 'react-router';

import FirstRoom from './FirstRoom'
import Setting from './Setting'
import {Rooms} from './Rooms'
import GuessCulprit from './GuessCulprit'
import Hatshepsut from './Hatshepsut'
import Items from './Items'

class Home extends Component {
    state = {
        showItems: false,
        clickCount: 0
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

    toggleItems = (e) => {
        this.setState({
            showItems: !this.state.showItems
        })
    }

    renderHome = () => {
        if (this.props.currentUser){
            return (
                <>
                <div className="home-content">
                    <Zoom>
                        <h2>Welcome {this.props.currentUser.name}!</h2>
                    </Zoom>
                        <button onClick={this.seeIntroduction}>Re-read the introduction</button>
                        <button onClick={this.continueStory}>Continue where you left off</button>
                        <button onClick={this.guessCulpritfunction}>Guess the culprit</button>
                        <button onClick={this.logoutUser}>Logout</button>
                    <p></p>
                    <p>Make sure you're playing on your desktop, with your screen full size.</p>
                    <Hatshepsut />
                </div>
                
            </>
            )
        } 
    }

    guessCulpritfunction = (e) => {
        this.props.history.push('/guess')
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

    renderRooms = () => {
        return (
            <FirstRoom 
            toggleItems={this.toggleItems} 
            zoomState={this.state.showItems} 
            clickCount={this.state.clickCount}
            resetClickCount={this.resetClickCount}/>
        )
    }

    resetClickCount = () => {
        this.setState({
            clickCount: 0
        })
    }

    closeImages = () => {
        this.setState({
            showItems: false,
            clickCount: this.state.clickCount + 1
        })

    }

    render() { 
        return ( 
            <div>
                <Switch>
                    <Route path="/home/setting" component={ Setting } />
                    <Route path="/home/room" render = { this.renderRooms } />
                    <Route path="/home/rooms" component = { Rooms } />
                    <Route path="/guess" component={ GuessCulprit } />
                    {/* <Route path="/dream" render={ this.renderRandomDream1 } /> */}
                    <Route render = {this.renderHome} />
                </Switch>

            { this.state.showItems ?
            <div className="location-items" >
                <Items/>
                <button onClick={this.closeImages} id="close-items-btn">{'\u00D7'}</button>
            </div>
            : null

            }
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