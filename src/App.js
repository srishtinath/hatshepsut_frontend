import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

import ProgressTracker from './components/ProgressTracker';
import ClueList from './components/ClueList';
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Welcome from './components/Welcome'

import { setUserInfo, setAllCharacters, setAllRooms, setUserRoom } from './actions/user'
import { setClueList, setClueItems} from './actions/cluelist'
import { Switch, Route, withRouter } from 'react-router';
import GuessCulprit from './components/GuessCulprit';


class App extends Component {

  state = {
    token: ""
  }

  componentDidMount(){
    if (localStorage.token){
      fetch("http://localhost:3000/users/stay_logged_in", {
        headers: {
          "Authorization": localStorage.token
        }
      })
      .then(r => r.json())
      .then(this.handleLoginResponse)
    }
      fetch("http://localhost:3000/characters")
      .then(r=> r.json())
      .then(charactersFetched => this.props.setAllCharacters(charactersFetched))
      
      fetch("http://localhost:3000/rooms")
      .then(r=> r.json())
      .then(roomsFetched => this.props.setAllRooms(roomsFetched))
}
  handleLoginSubmit = (userInfo) => {
    console.log("Login form has been submitted")
    fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(userInfo)
        })
    .then(r => r.json())
    .then(this.handleLoginResponse)
  }

  handleRegisterSubmit = (userInfo) => {
    console.log("Register form has been submitted")
    fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(userInfo)
        })
        .then(r => r.json())
        .then(this.handleRegisterResponse)
  }

  handleLoginResponse = (resp) => {
    if (resp.message){
      console.log(resp.message)
    } else {
      localStorage.token = resp.token
      localStorage.cluelistId = resp.user.clue_list.id
      this.setState({
        token: resp.token
      }, this.handleInitialInfo(resp.user))
    this.props.history.push('/home')
  }
}

  handleRegisterResponse = (resp) => {
    console.log(resp)
    if (resp.message){
      console.log(resp.message)
    } else {
      localStorage.token = resp.token
      localStorage.cluelistId = resp.user.clue_list.id
      this.setState({
        token: resp.token
      }, this.handleInitialInfo(resp.user))
    this.props.history.push('/home/setting')
  }
}

  handleInitialInfo = (user) => {
      this.props.setUserInfo(user)
      this.props.setClueList(localStorage.cluelistId)
      this.props.setClueItems(user.clue_list.items)
      this.props.setUserRoom(user.user_rooms)
      console.log("Initial Info Set")
  }

  renderForm = (routerProps) => {
    if (routerProps.location.pathname === "/login"){
      return <LoginForm formName="Login" handleSubmit={this.handleLoginSubmit}/>
    } else if (routerProps.location.pathname === "/register"){
      return <LoginForm formName="Register" handleSubmit={this.handleRegisterSubmit}/>
    } else {
      return <LoginForm formName="Login" handleSubmit={this.handleLoginSubmit}/>
    }
  }

  renderHome = (routerProps) => {
    if (this.state.token) {
      return (
          <Home logoutUser={this.logoutUser}/>
    )
    } else {
        this.props.history.push("/login")
    }
  }

  logoutUser = () => {
    localStorage.token = ""
    localStorage.cluelistId = ""
    this.props.history.push('/welcome')
    this.setState({
      token: ""
    })
  }

  renderGuess = () => {
    return <GuessCulprit />
  }

  renderWelcome = () => {
    return <Welcome />
  }

  render() { 
          return (
           <>
           <div className="body-content">
          <Switch>
              <Route path="/welcome" render={this.renderWelcome} />
              <Route path="/home" render={this.renderHome}/>
              <Route path="/login" render={this.renderForm} />
              <Route path="/register" render={this.renderForm} />
              <Route path="/guess" render={this.renderGuess} />
              <Route render={this.renderWelcome} />
          </Switch>
          </div>
          { this.state.token ? 
          <>
            <ProgressTracker />
            <ClueList />
          </>
          : null}
          </>
      )
  }
}

let mapDispatchToProps = {
  setUserInfo,
  setClueList,
  setClueItems,
  setAllCharacters,
  setAllRooms,
  setUserRoom
}

let mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    cluelistId: state.cluelistId,
    clueItems: state.clueItems,
    allCharacters: state.allCharacters,
    allRooms: state.allRooms,
    userRooms: state.userRooms
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
