import React, { Component } from 'react';
import {connect} from 'react-redux'
import { removeItemFromClueList } from '../actions/cluelist'
import { setClueList, setClueItems } from '../actions/cluelist'
import { withRouter } from 'react-router'

class ClueList extends Component {

    componentDidMount(){
        console.log(this.props.cluelistId)
        // this.props.setClueItems(this.props.cluelist.items)
    }

    handleRemoveFromNotepad = (item) => {
    let entryId = this.props.cluelistId
        fetch(`http://localhost:3000/clue_lists/${entryId}/deleteItem/${item.id}`, {
            method: "DELETE",
            headers: {
                "content-type":"application/json",
                "accept": "application/json"
            }
        })
        .then(r => r.json())
        .then(resp => {
            console.log(resp)
            this.props.removeItemFromClueList(item)
        })
    }

    guessCulprit = (e) => {
        this.props.history.push('/guess')
    }

    render() {
        return ( 
            <>
                <input type="checkbox" id="menu" />
                <label htmlFor="menu" className="icon">
                        <div className="menu"></div>
                </label>
                <div className="cluelist-container">
                <>
                    <ul>
                        {this.props.clueItems ? 
                        <>
                        {this.props.clueItems.map(item => {
                        return <li key={item.id + Math.random()}>{item.name}
                                <button onClick={(event) => this.handleRemoveFromNotepad(item)} >{'\u00D7'}</button>
                            </li>
                    })}
                    </>
                    : null}
                    </ul>
                </>
                <button className="guess-culprit-btn" onClick={this.guessCulprit}>Guess the culprit!</button>
                </div>
            </>
         );
    }
}

let mapStateToProps = (state) => {
    return ({
        cluelistId: state.cluelistId,
        clueItems: state.clueItems,
        currentUser: state.currentUser
        })
}

let mapDispatchToProps = {
    removeItemFromClueList,
    setClueList,
    setClueItems
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ClueList));