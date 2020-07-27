import React, { Component } from 'react';
import {withRouter} from 'react-router'
import {connect} from 'react-redux'

class GuessCulprit extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    goHome = (e) => {
        this.props.history.push('/home')
    }

    handleguess = (e) => {
        e.preventDefautl();
        console.log(e.target);
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    }

    render() { 
        return ( 
            <>
            <div className="home-content">
            <form onSubmit={this.handleguess}>
                <label>So... who do you think did it?</label>

                    <br></br>
                        {this.props.allCharacters.map(character => 
                            <p key={character.id}>
                            <input name="character" type="radio" value={character.name} />
                            <label>{character.name}</label>
                            </p>
                            )}
                <input type="submit" onClick={this.handleguess}></input>
            </form>

            <button onClick={this.goHome}>Go back home cuz you're probably wrong</button>
            </div>
            </>
         );
    }
}

let mapStateToProps = (state) => {
    return {
        allCharacters: state.allCharacters
    }
}
 
export default connect(mapStateToProps)(withRouter(GuessCulprit));