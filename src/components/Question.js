import React, { useState, useEffect } from 'react'
import Answers from './Answers'

const Question = (props) => {

    const [showButton, setButton] = useState(false)
    const [question, setQuestion] = useState("")
    const [answers, setAnswers] = useState([])
    const [correct, setCorrect] = useState(0)

    useEffect(()=>{
        console.log(props.questionData)
        if (props.questionData){
            setQuestion(props.questionData.question)
            setAnswers([props.questionData.answers[0], props.questionData.answers[1], props.questionData.answers[2], props.questionData.answers[3] ])
            setCorrect(props.questionData.correct)
        }
    }, [props.questionData])
    

    const handleShowButton = () => {
        setButton(true)
    }

    const nextQuestion = () => {
        console.log("Hi")
        props.nextQuestion()
    }

    const handleIncreaseScore = () => {
        props.handleIncreaseScore()
    }

    let {nr, total} = props

    return (
        <>
        <h4>Question {nr + 1} of {total}</h4>
        <h5>{question}</h5>

        <Answers 
        question={question} 
        answers={answers} 
        correct={correct} 
        showButton={handleShowButton} 
        increaseScore={handleIncreaseScore}/>

        <div id="submit">
            {showButton ? 
            <button className="fancy-btn" onClick={nextQuestion} >{nr>=(total-1) ? 'Finish quiz' : 'Next question'}</button> 
            : null
            }
        </div>
        </>
     );
}
 
export default Question;