import React, { Component } from 'react';
import { connect } from 'react-redux'
import Zoom from 'react-reveal/Zoom';
import { withRouter } from 'react-router';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            toggleText: false }
    }

    toggleText = (e) => {
        this.setState({
            toggleText: !this.state.toggleText
        })
    }

    logoutUser = (e) => {
        // e.preventDefault()
        localStorage.token = ""
        this.props.history.push('/login')
      }

      continueStory = (e) => {
          this.props.history.push('/firstroom')
      }

    render() { 
        return ( 
            <div onClick={this.toggleText}>
                    <Zoom>
                    <p>Welcome {this.props.currentUser.name}!</p>
                    </Zoom>

            { this.props.currentUser ?
            <>
                <button onClick={this.logoutUser}>Logout!</button>
                <button onClick={this.continueStory}>Continue where you left off...</button>
                </>
            : null
            }

            </div>
         );
    }
}

let mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}
 
export default connect(mapStateToProps)(withRouter(Home));