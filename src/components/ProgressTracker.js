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
        if (this.props.userRooms !== prevProps.userRooms || this.props.allRooms !== prevProps.allRooms){
            let newPerc = (this.props.userRooms.length / this.props.allRooms.length) * 100
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
            imageArray.push(<img key={step + Math.random()} src="https://res.cloudinary.com/dqtw2xfuf/image/upload/v1595632000/Hatshepsut/Screen_Shot_2020-07-24_at_7.04.57_PM_eovwlc.png" alt="incomplete" className="progress-img"/>)
        }
        for (let step = 0; step<incompletePerc; step++){
            imageArray.push(<img key={step} src="https://res.cloudinary.com/dqtw2xfuf/image/upload/v1595631998/Hatshepsut/Screen_Shot_2020-07-24_at_7.04.41_PM_gxuonj.png" alt="incomplete" className="progress-img"/>)
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