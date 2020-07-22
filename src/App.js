import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

import ProgressTracker from './components/ProgressTracker';
import ClueList from './components/ClueList';
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import GuessCulprit from './components/GuessCulprit'

import { setUserInfo } from './actions/user'
import { setClueList, setClueItems} from './actions/cluelist'
import { Switch, Route, withRouter } from 'react-router';


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
      .then(this.handleResponse)
    }

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
    .then(this.handleResponse)
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
        .then(this.handleResponse)
  }

  handleResponse = (resp) => {
    console.log(resp)
    if (resp.message){
      console.log(resp.message)
    } else {
      localStorage.token = resp.token
      localStorage.cluelistId = resp.user.clue_list.id
      this.setState({
        token: resp.token
      }, this.handleInitialInfo(resp.user))
      this.props.history.push("/home")
    }
  }

  handleInitialInfo = (user) => {
      this.props.setUserInfo(user)
      this.props.setClueList(localStorage.cluelistId)
      this.props.setClueItems(user.clue_list.items)
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
    if (localStorage.token) {
      return (
          <Home logoutUser={this.logoutUser}/>
    )
    } else {
      this.props.history.push("/login")
      console.log("boo")
    }
  }


  // user for registration - when new user created
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
      this.props.setClueList(cluelistInfo)
    })
  }

  guessCulprit = () => {
    return <GuessCulprit />
  }

  render() { 
          return (
           <>
           <div className="body-content">
          <Switch>
              <Route path="/home" render={this.renderHome}/>
              <Route path="/login" render={this.renderForm} />
              <Route path="/register" render={this.renderForm} />
              <Route path="/guess" render={this.guessCulprit} />
          </Switch>
          </div>
          { localStorage.token ? 
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
  setClueItems
}

let mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    cluelistId: state.cluelistId,
    clueItems: state.clueItems
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
