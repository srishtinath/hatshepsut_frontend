import React, { Component } from 'react';
import {connect} from 'react-redux'
import { removeItemFromClueList } from '../actions/cluelist'


class ClueList extends Component {

    handleRemoveFromNotepad = (item) => {
    let entryId = this.props.cluelist.id
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

    render() {
        return ( 
            <>
                <input type="checkbox" id="menu" />
                <label for="menu" class="icon">
                        <div class="menu"></div>
                </label>
                <div className="cluelist-container">
                This is the ClueList div!
                <>
                <ul>
                    {this.props.clueItems ? 
                    <>
                    {this.props.clueItems.map(item => {
                    return <li key={item.id + Math.random()}>{item.name}
                            <button onClick={(event) => this.handleRemoveFromNotepad(item)} >Remove from Notepad</button>
                        </li>
                })}
                </>
                : null}
                </ul>
                </>
            </div>
            </>
         );
    }
}

let mapStateToProps = (state) => {
    return ({
        cluelist: state.cluelist,
        clueItems: state.clueItems
        })
}

let mapDispatchToProps = {
    removeItemFromClueList
}
 
export default connect(mapStateToProps, mapDispatchToProps)(ClueList);