import React, { useEffect, useState } from 'react';
import quizQuestions from './quizQuestions'
import Question from './Question'

import { CloseButton } from './CloseButton';

const Quiz = (props) => {
 
const [nr, setNR] = useState(0)
const [questionData, setQuestionData] = useState(quizQuestions[0])
const [total] = useState(quizQuestions.length)
const [score, setScore] = useState(0)
const [displayScore, setDisplayScore] = useState(false)
const [wonQuiz, setWonQuiz] = useState(false)

useEffect(()=>{
    console.log(quizQuestions)
    setQuestionData(quizQuestions[0])
}, [])


// change the className of answers
const nextQuestion = () => {
    console.log(nr)      
    if(nr === (total-1)){
        setDisplayScore(true)
    } else {
        setQuestionData(quizQuestions[nr])
        setNR(nr + 1)
    }
}

const restartQuiz = () => {
    console.log("Hello from restart Quiz?")
    setDisplayScore(false)
    setScore(0)
    setNR(0)
}

const handleIncreaseScore = () => {
    setScore(score + 1)
    if (score >= 3){
        setWonQuiz(true)
    }
}

useEffect(()=> {
    setQuestionData(quizQuestions[nr])
}, [nr])

    return (
        <div className="container">
            { displayScore ? 
            <>
                <p>You got: <strong>{score}</strong> out of <strong>{total}</strong> questions right.</p>
                { wonQuiz ?
                <>
                    <p>Congratulations! You got at least 80 percent of questions correct!</p>
                    <CloseButton closeBox={props.closeQuiz} className="quiz-close-btn"/>
                </>
                : 
                <button onClick={restartQuiz}>Retake Quiz</button>
                }
            </>
            :
            <div id="question">
                <Question 
                nr={nr} 
                questionData={questionData} 
                total={total} 
                handleIncreaseScore={handleIncreaseScore}
                nextQuestion={nextQuestion}/>
            </div>
            }
        </div>
    );
};

export default Quiz