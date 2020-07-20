import React, { Component } from 'react';
import { connect } from 'react-redux'

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inCluelist: false
         }
    }
    
    inCluelist = (item) => {
        let itemFound
        if (this.props.cluelist.items){
            itemFound = this.props.cluelist.items.find(itemList => itemList.id === item.id)
        }
        if (itemFound){
            this.setState({
                inCluelist: !this.state.inCluelist
            })
        }
    }

    render() { 
        return ( 
        <div key={this.props.item.id} className="item-div">
        <div className="item-underlay">
            <img src={this.props.item.image_url} alt={this.props.item.name} className="item-image"/>
        </div>
        <div className="item-overlay">
        <p>{this.props.item.description}</p>
        <button onClick={(event) => this.props.handleAddToNotepad(this.props.item)} className="add-notepad-btn">
            {this.inCluelist(this.props.item) ? "Already in notepad!" : "Add to Notepad!"}
            </button>
        </div>
    </div> );
    }
}

let mapStateToProps = (state) => {
    return {
        cluelist: state.cluelist
    }
}
 
export default connect(mapStateToProps)(Item);