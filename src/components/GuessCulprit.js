import React, { Component } from 'react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

import RightAnswer from './RightAnswer'
import WrongAnswer from './WrongAnswer'

import {removeUserRoom} from '../actions/room'

class GuessCulprit extends Component {
    
    state = { 
        showForm: true,
        showWrong: true,
        numberOfGuesses: 0,
        choice: ""
        }

    goHome = (e) => {
        this.props.history.push('/home')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            showForm: false,
            choice: ""
        })
        if (this.state.choice !== "Riccardo Bonardi" && this.state.numberOfGuesses < 2){
            this.setState({
                numberOfGuesses: this.state.numberOfGuesses + 1
            })
        } else if (this.state.numberOfGuesses === 2){
            if (window.confirm("Are you sure you want to submit? This is your last guess.")){
                if(this.state.choice !== "Riccardo Bonardi"){
                    this.resetGame()
                    this.props.history.push('/home')
                } else {
                    this.setState({
                        showWrong: false
                    })
                }
            } else {
                this.setState({
                    showForm: true
                })
            }
        } else {
            this.setState({
                showWrong: false
            })
        }
    }

    handleWrong = (e) => {
        if (this.state.numberOfGuesses < 3){
            this.setState({
                showForm: true
            })
        } else {
            this.resetGame()
        }
    }

    resetGame = () => {
        this.setState({
            numberOfGuesses: 0,
            showForm: true
        })

        fetch(`http://localhost:3000/users/wrongGuess/${this.props.currentUser.id}`)
        .then(r => r.json())
        .then(message => {
            console.log(message)
            this.props.removeUserRoom()
        })
    }

    handleChange = (e) => {
        this.setState({ choice: e.target.value});
    }

    render() { 
        let characterChoices = ["Atif Mostafa", "Lord Kit Sharp", "Lady Amelia Sharp", "Gael Vergara", "Isra Hassan", "Riccardo Bonardi", "No one", "Queen Hatshepsut", "Masud Deeb"]
        return ( 
            <div className="home-content">
            {this.state.showForm ? 
            <>
                <form onSubmit={this.handleSubmit}>
                    <label><h2>So... who do you think did it?</h2> <p>You have 3 chances to guess correctly. If you're wrong... you have to start your journey all over again.</p></label>
                            {characterChoices.map(character => 
                                <p key={character.id}>
                                <input name="character" 
                                type="radio" 
                                value={character} 
                                onChange={this.handleChange} 
                                checked={this.state.choice === character}/>
                                <label>{character}</label>
                                </p>
                                )}
                    <button type="submit"> Guess</button>
                </form>
                <button onClick={this.goHome}>Go back home cuz you're probably wrong</button>
                </>
                : 
                <>
                    { this.state.showWrong ? 
                        <WrongAnswer handleWrong={this.handleWrong} guesses={this.state.numberOfGuesses}/>
                    :
                        <RightAnswer />
                    }
            </>
            }
            </div>
         );
    }
}

let mapDispatchToProps = {
    removeUserRoom
}

let mapStateToProps = (state) => {
    return {
        allCharacters: state.allCharacters,
        currentUser: state.currentUser
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GuessCulprit));