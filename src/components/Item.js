import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addItemToClueList } from '../actions/cluelist'

class Item extends Component {
    state = { 
            inCluelist: false
         }

    componentDidMount(){
        this.inCluelist(this.props.item)
    }

    componentDidUpdate(prevProps){
        if (prevProps.clueItems !== this.props.clueItems){
            this.inCluelist(this.props.item)
        }
    }

    handleAddToNotepad = (itemId) => {
        console.log(this.props.cluelistId)
        fetch(`https://hatshepsut.herokuapp.com//item_clue_lists/`, {
            method: "POST",
            headers: {
                "content-type":"application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                item_id: itemId,
                clue_list_id: localStorage.cluelistId
            })
        })
        .then(r => r.json())
        .then(fetchedItem => {
            this.props.addItemToClueList(fetchedItem)
            this.inCluelist()
        })
    }

    inCluelist = () => {
        let itemFound
        if (this.props.clueItems){
            itemFound = this.props.clueItems.find(itemList => itemList.id === this.props.item.id)
        }
        if (itemFound){
            this.setState({
                inCluelist: true
            })
        } else {
            this.setState({
                inCluelist: false
            })
        }
    }

    render() { 
        return ( 
        <div key={this.props.item.id} className="item-card">
            <div className="item-underlay">
                <img src={this.props.item.image_url} alt={this.props.item.name} className="item-image"/>
                <p>{this.props.item.name}</p>
            </div>
            <div className="item-overlay">
            <p>{this.props.item.description}</p>
            <button 
            onClick={(event) => this.handleAddToNotepad(this.props.item.id)} 
            className="add-notepad-btn"
            disabled={this.state.inCluelist}>
                {this.state.inCluelist ? "Already in notepad" : "Add to Notepad!"}
                </button>
            </div>
        </div> 
    );
    }
}

let mapStateToProps = (state) => {
    return {
        cluelistId: state.cluelistId,
        clueItems: state.clueItems
    }
}

let mapDispatchToProps = {
    addItemToClueList
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);