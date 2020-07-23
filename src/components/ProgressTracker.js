import React, { Component } from 'react';
import { connect } from 'react-redux'


class ProgressTracker extends Component {

    state = {
        percentage: 0
    }

    componentDidMount(){
        this.setState({
            percentage: 0
        })
    }
    componentDidUpdate(prevProps){
        if (this.props.userRooms !== prevProps.userRooms){
            let newPerc = (this.props.userRooms.size / this.props.allRooms.size) * 100
            this.setState({
                percentage: newPerc
            })
        }
    }

    render() { 
        console.log(this.state.percentage)
        
        return ( 
            <div className="progress-tracker-div">
                {/* This is the ProgressTracker div! */}
                { this.props.userRooms ? 
                <>
                <p>{this.state.percentage} %</p>
                </>
            : null}
            </div>
         );
    }
}

let mapStateToProps = (state) => {
    return {
        allRooms: state.allRooms,
        userRooms: state.userRooms
    }
}

export default connect(mapStateToProps)(ProgressTracker);