import React, { useEffect, useState } from 'react';
import data from './quizQuestions'
import Question from './Question'

import { CloseButton } from './CloseButton';

const Quiz = (props) => {
 
const [nr, setNR] = useState(1)
const [questionData, setQuestionData] = useState(data[0])
const [total] = useState(data.length)
const [score, setScore] = useState(0)
const [displayScore, setDisplayScore] = useState(false)
const [wonQuiz, setWonQuiz] = useState(false)

useEffect(()=>{
    console.log(data)
    setQuestionData(data[0])
}, [])

const nextQuestion = () => {
    console.log(nr)      
    if(nr === total){
        setDisplayScore(true)
    } else {
        setQuestionData(data[nr])
        setNR(nr + 1)
    }
}

const restartQuiz = () => {
    console.log("Hello from restart Quiz?")
    setDisplayScore(false)
    setScore(0)
    setNR(1)
}

const handleIncreaseScore = () => {
    setScore(score + 1)
    if (score >= 3){
        setWonQuiz(true)
    }
}

useEffect(()=> {
    setQuestionData(data[nr])
}, [nr])

//   render() {
      return (
          <div className="container">
                    { displayScore ? 
                    <>
                        <p>You got: <strong>{score}</strong> out of <strong>{total}</strong> questions right.</p>
                        { wonQuiz ?
                        <>
                          <p>Congratulations! You got more than 80 percent of questions correct!</p>
                          <CloseButton closeBox={props.closeQuiz} className="quiz-close-btn"/>
                          </>
                          : 
                          <button onClick={restartQuiz}>Retake Quiz</button>
                        }
                        </>
                      :
                      <>
                      <div id="question">
                          <Question 
                          nr={nr} 
                          questionData={questionData} 
                          total={total} 
                          handleIncreaseScore={handleIncreaseScore}
                          nextQuestion={nextQuestion}/>
                      </div>
                      </>
                      }
          </div>
      );
//   }
};

export default Quiz