import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

import ProgressTracker from './components/ProgressTracker';
import ClueList from './components/ClueList';
import Body from './components/Body';
import Setting from './components/Setting';



class App extends Component {
  state = {
    user: {},
    rooms: [],
    cluelist: []
  }

  componentDidMount(){
    fetch("http://localhost:3000/rooms")
    .then(r => r.json())
    .then((rooms) => {
      this.props.setAllRooms(rooms)
    })
  }

  //   if(localStorage.token){
  //     fetch("http://localhost:4000/users/stay_logged_in",{
  //       headers: {
  //         "Authorization": localStorage.token
  //       }
  //     })
  //     .then(r => r.json())
  //     .then(this.handleResponse)

  //   }
  // }

  // renderForm = (routerProps) => {
  //   if(routerProps.location.pathname === "/login"){
  //     return <Form
  //       formName="Login Form"
  //       handleSubmit={this.handleLoginSubmit}
  //     />
  //   } else if (routerProps.location.pathname === "/register") {
  //     return <Form
  //       formName="Register Form"
  //       handleSubmit={this.handleRegisterSubmit}
  //     />
  //   }
  // }

  // renderProfile = (routerProps) => {
  //   if(this.props.loggedIn){
  //     return <Profile />
  //   } else {
  //     this.props.history.push("/login")
  //   }
  // }

  //will change in Redux
  handleCluelist = (LocationObject) => {
    fetch("http://localhost:3000/item_clue_lists", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "applicatin/json"
      }, 
      body: JSON.stringify({
        location: LocationObject,
        cluelist: this.props.cluelist
      })
    })
    .then(r => r.json())
    .then (cluelistInfo => {
      setCluelistInfo(cluelistInfo)
    })
  }

  render() { 
    return ( 
      <div>
        <ProgressTracker />
        <ClueList cluelist={this.props.cluelist}/>
        <Body rooms={this.props.rooms} handleCluelist={this.handleCluelist}/>
      </div>
  );
  }
}

let setAllRooms = (roomsArr) => {
  return {
    type: "SET_ALL_ROOMS",
    payload: roomsArr
  }
}
let setAllLocations = (locationsArr) => {
  return {
    type: "SET_ALL_LOCATIONS",
    payload: locationsArr
  }
}
let setAllItems = (itemsArr) => {
  return {
    type: "SET_ALL_ITEMS",
    payload: itemsArr
  }
}


let setUserInfo = (userInfo) => {
  return {
    type: "SET_USER_INFO",
    payload: userInfo
  }
}
let setCluelistInfo = (cluelistInfo) => {
  return {
    type: "SET_CLUELIST_INFO",
    payload: cluelistInfo
  }
}
let setCharacterInfo = (characterInfo) => {
  return {
    type: "SET_CHARACTER_INFO",
    paylod: characterInfo
  }
}

// mapDispatchToProps is a POJO that will be merged as props to App
let mapDispatchToProps = {
  setAllRooms: setAllRooms,
  setAllLocations: setAllLocations,
  setAllItems: setAllItems,
  setUserInfo: setUserInfo,
  setCluelistInfo: setCluelistInfo,
  setCharacterInfo: setCharacterInfo
}


let mapStateToProps = (globalState) => {
  return {
    loggedIn: true
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
