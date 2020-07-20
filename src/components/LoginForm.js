import React, { Component } from 'react';

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
            <div className="login-form"> <h1>{formName}</h1>
                <form onSubmit={this.handleSubmit} >
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter name"></input>
                    <input type="text" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password"></input>
                    <input type="submit"/>
                </form>
            </div>
            <div>
                <img src="https://res.cloudinary.com/dqtw2xfuf/image/upload/v1595266951/Hatshepsut/Screen_Shot_2020-07-20_at_1.42.04_PM_vycsij.png" alt="egypt-goddess" className="intro-image"/>
            </div>
            <div className="intro-box">
                <h2>Who was Hatshepsut?</h2>
                <p>The most badass pharaoh ever clearly</p>
            </div>
            </>
            );
    }
}
 
export default LoginForm;