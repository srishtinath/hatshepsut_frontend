import React, { Component } from 'react';

class ClueList extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            cluelist: []
        }
    }

    componentDidMount(){
        fetch("http://localhost:3000/clue_lists/14")
        .then(r => r.json())
        .then(fetchedCluelist => {
            this.setState({
                cluelist: fetchedCluelist
            })
        })
    }
    render() { 
        return ( 
            <div className="cluelist-container">
                This is the ClueList div!
                {this.state.cluelist.items ? 
                <>
                <ul>
                {this.state.cluelist.items.map(item => {
                    return <li>{item.name}</li>
                })}
                </ul>
                </>
                : null}
            </div>
         );
    }
}
 
export default ClueList;