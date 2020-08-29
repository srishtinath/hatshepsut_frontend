import React, { Component } from 'react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

import RightAnswer from './RightAnswer'
import WrongAnswer from './WrongAnswer'
import characterGuesses from './characterGuesses'

import {removeUserRoom} from '../actions/room'
import CharacterIntros from './CharacterIntros';

class GuessCulprit extends Component {
    
    state = { 
        showForm: true,
        showWrong: true,
        numberOfGuesses: 0,
        choice: ""
        }

    goHome = (e) => {
        this.props.history.push('/hatshepsut_frontend/home')
    }

    handleSubmit = (e) => {
        if(this.state.choice){
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
                        this.props.history.push('/hatshepsut_frontend/home')
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

        fetch(`https://hatshepsut.herokuapp.com//users/wrongGuess/${this.props.currentUser.id}`)
        .then(r => r.json())
        .then(message => {
            console.log(message)
            this.props.removeUserRoom()
        })
    }

    handleChange = (e) => {
        this.setState({ 
            choice: e.target.alt}, (() => {
                let descriptionBox = document.getElementsByClassName("selected")[0]
                descriptionBox.innerHTML = `<p>Selected: ${this.state.choice}</p>`
            }));

    }

    showDescription = (e, name, description) => {
        let descriptionBox = document.getElementsByClassName("char-description")[0]
        descriptionBox.innerHTML = `<h2>${name}</h2>`
    }

    hideDescription = (e) => {
        let descriptionBox = document.getElementsByClassName("char-description")[0]
        descriptionBox.innerText = ""
    }

    render() { 
        return ( 
            <>
            {this.state.showForm ? 
                <div className="home-content">
                    <label><h2>So... who do you think did it?</h2> <p>You have 3 chances to guess correctly. If you're wrong... you have to start your journey all over again.</p></label>
                    <div className="char-container">
                        
                        <div className="char-description">
                        </div>
                        <div className="guess-char">
                        {characterGuesses.map(character => 
                        <div key={character.name} className="guess-char-img-div">
                            <img 
                            src={character.image_url} 
                            alt={character.name} 
                            className={ this.state.choice !== character.name? "guess-char-img": "guess-char-img culprit-selected"}
                            onClick={this.handleChange}
                            onMouseEnter={(e) => this.showDescription(e, character.name)}
                            onMouseLeave={this.hideDescription} 
                            />
                        </div>
                        )} 
                        </div>
                        <div className="selected">
                        </div>
                    </div>
                <button onClick={this.handleSubmit}>Guess</button>
                <button onClick={this.goHome}>Go back home cuz you're probably wrong</button>
                </div>
                : 
                <>
                    { this.state.showWrong ? 
                        <WrongAnswer handleWrong={this.handleWrong} guesses={this.state.numberOfGuesses}/>
                    :
                        <RightAnswer />
                    }
            </>
            }
            </>

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