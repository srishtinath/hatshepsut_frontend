import React from 'react';

const WrongAnswer = (props) => {

    const handleWrong = () => {
        props.handleWrong()
    }

    return ( 
        <div>
            <p>Wrong Answer :(</p>
            <p>Number of guesses: {props.guesses}</p>
            <button onClick={handleWrong}>Try again</button>
        </div>
     );
}
 
export default WrongAnswer;