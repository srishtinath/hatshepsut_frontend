import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class LoginForm extends Component {
    state = {
        name: "",
        password: "",
        // image: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
        this.setState({
            name: "",
            password: ""
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() { 
        let { formName } = this.props

        return ( 
            <>
            <div className="home-logo-container">
                <img src="https://res.cloudinary.com/dqtw2xfuf/image/upload/v1595988720/Hatshepsut/Hatshepsut_Mystery_Logo_pres9y.png" alt="main-logo" className="home-logo"/>
                <div className="home-description">
                    <p>The Hatshepsut Mystery is a murder mystery game.</p>
                </div>
            </div>
            <div className="login-form">
                 <h1>{formName}</h1>
                <form onSubmit={this.handleSubmit} >
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter name"></input>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password"></input>
                    <input type="submit"/>
                </form>
                <br></br>
                { formName === "Login" ? 
                <NavLink to="/register">Register</NavLink>    
                :
                <NavLink to="/login">Login</NavLink>    
                }
            </div>
            </>
            );
    }
}
 
export default LoginForm;