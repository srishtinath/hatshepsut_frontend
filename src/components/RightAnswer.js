import React from 'react';
import Confetti from 'react-confetti'


const RightAnswer = () => {
    return ( 
        <div>
            <Confetti
            numberOfPieces={200}
            // onConfettiComplete={null}
            />
            <h1>Right Answer!</h1>
        </div>
     );
}
 
export default RightAnswer;