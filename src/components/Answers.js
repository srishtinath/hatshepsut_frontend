import React, { useState, useEffect } from 'react';

function Answers(props) {
    
    const [classNames, setClassNames] = useState(['', '', '', ''])
        
    useEffect(() => {
        setClassNames(['', '', '', ''])
    }, [])
        
    useEffect(() => {
        setClassNames(['', '', '', ''])
    }, [props.answers])
    
    const checkAnswer = (e) => {        
        let elem = e.target;
        let { correct, increaseScore } = props;
        let answer = Number(elem.dataset.id);
        let updatedClassNames = classNames;

        if(answer === correct){
            updatedClassNames[answer] = 'right';
            increaseScore();
        }
        else {
            updatedClassNames[answer] = 'wrong';
        }
        
        setClassNames(updatedClassNames)
        props.showButton();
    }
    
    const { answers } = props;        
    return (
        <div id="answers">
            <ul>
                <li onClick={checkAnswer} className={classNames[0]} data-id="0" > {answers[0]}</li>
                <li onClick={checkAnswer} className={classNames[1]} data-id="1" > {answers[1]}</li>
                <li onClick={checkAnswer} className={classNames[2]} data-id="2" > {answers[2]}</li>
                <li onClick={checkAnswer} className={classNames[3]} data-id="3" > {answers[3]}</li>
            </ul>
        </div>
    );
    }

export default Answers