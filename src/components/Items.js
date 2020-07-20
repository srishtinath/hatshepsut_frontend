import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addItemToClueList } from '../actions/cluelist'
import Item from './Item'


class Items extends Component {
    state = {
        items: [],
        cluelistId: 0
    }

    componentDidMount(){
        this.setState({
            items: this.props.items
        })
    }

    handleAddToNotepad = (item) => {
        fetch("http://localhost:3000/item_clue_lists", {
            method: "POST",
            headers: {
                "content-type":"application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                item_id: item.id,
                clue_list_id: this.props.cluelist.id
            })
        })
        .then(r => r.json())
        .then(fetchedItem => {
            console.log(fetchedItem)
            this.props.addItemToClueList(fetchedItem)
        })
    }

    render() { 
        console.log(this.props)
        return ( 
            <>
            {this.props.items ? 
            <>
            {this.props.items.map(item => {
                return (
                < Item item = {item} handleAddToNotepad={this.handleAddToNotepad}/>
                )}
                )}
            </>
            : null}
            <button onClick={this.props.goToRoomDetails} className="go-back-btn"><p>Go back</p></button>
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
    addItemToClueList
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Items);