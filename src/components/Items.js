import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addItemToClueList } from '../actions/cluelist'


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
            localStorage.items = [...localStorage.items, fetchedItem]
            this.props.addItemToClueList(fetchedItem)
        })
        // this.props.addItemToClueList(item, this.props.location)
    }

    render() { 
        console.log(this.props)
        return ( 
            <>
            {this.props.items ? 
            <>
            {this.props.items.map(item => {
                return (
                <div key={item.id} className="item-div">
                    <div className="item-underlay">
                        <img src={item.image_url} alt={item.name} className="item-image"/>
                    </div>
                    <div className="item-overlay">
                    <p>{item.description}</p>
                    <button onClick={(event) => this.handleAddToNotepad(item)} className="add-notepad-btn" >Add to Notepad!</button>
                    </div>
                </div>
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