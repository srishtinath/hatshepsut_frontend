import React, { Component } from 'react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

import RightAnswer from './RightAnswer'
import WrongAnswer from './WrongAnswer'

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
        console.log('You have selected:', this.state.choice)
        this.setState({
            showForm: false,
        })
        // if wrong
        console.log(e.target.value)
        if (this.state.choice !== "Riccardo Bonardi"){
            this.setState({
                numberOfGuesses: this.state.numberOfGuesses + 1
            })
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
        // need to remove all user associations
    }

    handleChange = (e) => {
        this.setState({ choice: e.target.value});
    }

    render() { 
        let filteredCharacters = this.props.allCharacters.filter(char => char.display === true)
        return ( 
            <div className="home-content">
            {this.state.showForm ? 
            <>
                <form onSubmit={this.handleSubmit}>
                    <label>So... who do you think did it? <br></br>You have 3 chances to guess correctly. If you're wrong... you have to start your journey all over again.</label>
                            {filteredCharacters.map(character => 
                                <p key={character.id}>
                                <input name="character" 
                                type="radio" 
                                value={character.name} 
                                onChange={this.handleChange} 
                                checked={this.state.choice === character.name}/>
                                <label>{character.name}</label>
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

let mapStateToProps = (state) => {
    return {
        allCharacters: state.allCharacters
    }
}
 
export default connect(mapStateToProps)(withRouter(GuessCulprit));