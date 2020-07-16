import React, { Component } from 'react';
import { connect } from 'react-redux'


class Location extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            toggleImages: false,
            items: []
         }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/locations/${this.props.location.id}`)
        .then(r => r.json())
        .then(locationInfo =>{   
            this.setState({
                items: locationInfo.items
            })
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
                clue_list_id: 14
            })
        })
        .then(r => r.json())
        .then(items => {
            console.log(items)
        })
        // this.props.addItemToClueList(item, this.props.location)
    }

    showImages = () => {
        this.setState({
            toggleImages: !this.state.toggleImages
        })
    }

    render() { 
        // console.log(this.props.location)
        return ( 
            <div>
                <h1>{this.props.location.name}</h1>
                <p onClick={this.showImages}>
                    <img src={this.props.location.image_url} alt={this.props.location.name} className="location-image" onClick={this.showImages}/>
                    </p>
                {this.state.toggleImages ? 
                    this.state.items.map(item => {
                        return (
                        <div key={item.id}>
                            <img src={item.image_url} alt={item.name} className="item-image"/>
                            <p>{item.description}</p>
                            <button onClick={(event) => this.handleAddToNotepad(item)} className="add-notepad-btn" >Add to Notepad!</button>
                        </div>
                        )}
                        )
                : null
                }
            </div>
         );
    }
}

let addItemToClueList = (itemObject, locationObject) => {
    return {
      type: "ADD_ITEM",
      payload: {
          itemObject,
          locationObject}
    }
}
  
  // mapDispatchToProps is a POJO that will be merged as props to App
let mapDispatchToProps = {
    addItemToClueList: addItemToClueList
}


let mapStateToProps = (state) => {
    return {
        cluelist: state.cluelist
    }
}
 
export default connect( mapStateToProps,mapDispatchToProps)(Location);