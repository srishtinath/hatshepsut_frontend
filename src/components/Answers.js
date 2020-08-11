import React, { useState, useEffect } from 'react';

function Answers(props) {
    
    const [isAnswered, setIsAnswered] = useState(false)
    const [classNames, setClassNames] = useState(['', '', '', ''])
        
    useEffect(() => {
        setIsAnswered(props.isAnswered)
        setClassNames(['', '', '', ''])
    }, [])
    
    const checkAnswer = (e) => {        
        if(!isAnswered) {
            let elem = e.currentTarget;
            let { correct, increaseScore } = props;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = classNames;

            if(answer === correct){
                updatedClassNames[answer-1] = 'right';
                increaseScore();
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
            }
            
            setClassNames(updatedClassNames)
            props.showButton();
        }
    }
    
    const { answers } = props;        
    return (
        <div id="answers">
            <ul>
                <li onClick={checkAnswer} type="radio" className={classNames[0]} data-id="1" > {answers[0]}</li>
                <li onClick={checkAnswer} type="radio" className={classNames[1]} data-id="2" > {answers[1]}</li>
                <li onClick={checkAnswer} type="radio" className={classNames[2]} data-id="3" > {answers[2]}</li>
                <li onClick={checkAnswer} type="radio" className={classNames[3]} data-id="4" > {answers[3]}</li>
            </ul>
        </div>
    );
    }

export default Answers