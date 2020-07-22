import React, { Component } from 'react';
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom';
import { withRouter, Switch, Route } from 'react-router';

import FirstRoom from './FirstRoom'
import Setting from './Setting'

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
                    {/* Add Component to see All Rooms --> will be grayed out once visited */}
                    <button onClick={this.logoutUser}>Logout</button>
                    <p></p>
                    <div className="room-index">
                    {this.props.allRooms.map(room => 
                        <div key={room.id}>
                            <img src={room.image_url} alt={room.name} className="room-index-img" />
                        </div>

                        )}
                    </div>
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
        localStorage.token = ""
        localStorage.cluelistId = ""
        this.props.history.push('/login')
      }

    seeIntroduction = (e) => {
        this.props.history.push('home/setting')
    }

    continueStory = (e) => {
        this.props.history.push('home/firstroom')
    }


    firstRoom = () => {
        return <FirstRoom />
    }


    renderSetting = () => {
        return <Setting />
    }
    render() { 
        return ( 
            <div>
                <Switch>
                    <Route path="/home/setting" render={ this.renderSetting } />
                    <Route path="/home/firstroom" render = {this.firstRoom} />
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