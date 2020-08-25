import React from 'react';
import Confetti from 'react-confetti'


const RightAnswer = () => {
    return ( 
        <div className="right-answer">
            <Confetti
            numberOfPieces={200}
            />
            <div className="right-text">            
            <h1>Right Answer!</h1>
            <p>Congratulations! You figured it out! The ghost of Professor Tess Ali, 
                your friend, lover, confidant in this journey can now be laid to rest.</p>
            <p>How did he do it?</p>
            <p>What will happen to the treasure now?</p>
            <p>The fate of the rest...</p>
            </div>
        </div>
     );
}
 
export default RightAnswer;