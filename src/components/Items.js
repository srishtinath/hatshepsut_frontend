import React, { Component } from 'react';
import { connect } from 'react-redux'

import { addItemToClueList, setClueItems } from '../actions/cluelist'
import Item from './Item'


class Items extends Component {

    componentDidMount(){
        this.setState({
            items: this.props.items
        })
    }


    render() { 
        // console.log(this.props)
        return ( 
            <>
            {this.props.items ? 
            <>
            {this.props.items.map(item => {
                return (
                < Item item = {item} handleAddToNotepad={this.handleAddToNotepad} key={item.id}/>
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
    addItemToClueList,
    setClueItems
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Items);