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
        e.preventDefautl()
        console.log(e.target.value)
    }

    render() { 
        return ( 
            <>
            <div className="home-content">
            <p>This is the GuessCulprit component</p>
            <form>
                <label>So... who do you think did it?
                    <br></br>
                    <select>
                        {this.props.allCharacters.map(character => 
                            <option value={character.name}>{character.name}</option>
                            )}
                    </select>
                </label>
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