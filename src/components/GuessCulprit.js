import React, { Component } from 'react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

import RightAnswer from './RightAnswer'
import WrongAnswer from './WrongAnswer'

class GuessCulprit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            showForm: true
         }
    }

    goHome = (e) => {
        this.props.history.push('/home')
    }

    handleguess = (e) => {
        e.preventDefault();
        console.log(e.target);
        this.setState({
            showForm: false
        })
    }

    render() { 
        return ( 
            <div className="home-content">
            {this.state.showForm ? 
            <>
                <form onSubmit={this.handleguess}>
                    <label>So... who do you think did it?</label>
                            {this.props.allCharacters.map(character => 
                                <p key={character.id}>
                                <input name="character" type="radio" value={character.name} />
                                <label>{character.name}</label>
                                </p>
                                )}
                    <button type="submit"> Guess</button>
                </form>
                <button onClick={this.goHome}>Go back home cuz you're probably wrong</button>
                </>
                : 
                <>
                <RightAnswer />
                <WrongAnswer />
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