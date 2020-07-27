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
        let filteredRooms = this.props.allRooms.filter(room => room.display === true)
        if (this.props.userRooms !== prevProps.userRooms || this.props.allRooms !== prevProps.allRooms){
            let newPerc = (this.props.userRooms.length / filteredRooms.length) * 100
            this.setState({
                percentage: newPerc
            })
        }
    }

    renderImages = () => {
        let imageArray = []
        let completePerc = Math.floor((this.state.percentage/ 10))
        if (completePerc > 10){
            completePerc = 10
        }
        let incompletePerc = 10 - completePerc
        if (incompletePerc < 0){
            incompletePerc = 0
        }
        for (let step = 0; step<completePerc; step++){
            imageArray.push(<img key={step + Math.random()} src="https://res.cloudinary.com/dqtw2xfuf/image/upload/v1595698426/Hatshepsut/hieroglyph_ebph6r.png" alt="incomplete" className="progress-img"/>)
        }
        for (let step = 0; step<incompletePerc; step++){
            imageArray.push(<img key={step} src="https://res.cloudinary.com/dqtw2xfuf/image/upload/v1595698431/Hatshepsut/scarab_lcoe6j.png" alt="incomplete" className="progress-img"/>)
        }

        return (imageArray)
    }

    render() { 
        let returnedArray = this.renderImages()
        // console.log(this.props.userRooms)
        return ( 
            <>
                { this.props.userRooms ? 
                <>
                    <div className="progress-tracker">
                        {returnedArray.map(obj => {
                            return obj
                        })}
                    </div>
                </>
                 : null}
            </>
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