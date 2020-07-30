import React, { Component } from 'react';
import Question from './Question'
import QuestionCount from './QuestionCount'
import AnswerOption from './AnswerOption'
import PropTypes from 'prop-types';


class Quiz extends Component {


    // componentDidMount() {
    //     const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));  
      
    //     this.setState({
    //       question: quizQuestions[0].question,
    //       answerOptions: shuffledAnswerOptions[0]
    //     });
    //   }

    // submitAnswers = () => {
    //     // if all correct => call closeQuiz
    //     // if one wrong => send alert, re-render
    // }

    // closeQuiz =() => {
    //     this.props.closeQuiz()
    // }

    // renderAnswerOptions = (key) => {
    //     return (
    //       <AnswerOption
    //         key={key.content}
    //         answerContent={key.content}
    //         answerType={key.type}
    //         answer={props.answer}
    //         questionId={props.questionId}
    //         onAnswerSelected={props.onAnswerSelected}
    //       />
    //     );
    //   }

    // handleAnswerSelected(event) {
    //     this.setUserAnswer(event.currentTarget.value);
    //     if (this.state.questionId < quizQuestions.length) {
    //         setTimeout(() => this.setNextQuestion(), 300);
    //       } else {
    //         setTimeout(() => this.setResults(this.getResults()), 300);
    //     }
    //   }

    // setUserAnswer(answer) {
    //     this.setState((state) => ({
    //       answersCount: {
    //         ...state.answersCount,
    //         [answer]: (state.answersCount[answer] || 0) + 1
    //       },
    //       answer: answer
    //     }));
    //   }

    //   setNextQuestion() {
    //     const counter = this.state.counter + 1;
    //     const questionId = this.state.questionId + 1;
    //     this.setState({
    //       counter: counter,
    //       questionId: questionId,
    //       question: quizQuestions[counter].question,
    //       answerOptions: quizQuestions[counter].answers,
    //       answer: ''
    //     });
    //   }

    //   getResults() {
    //     const answersCount = this.state.answersCount;
    //     const answersCountKeys = Object.keys(answersCount);
    //     const answersCountValues = answersCountKeys.map((key) => answersCount[key]);
    //     const maxAnswerCount = Math.max.apply(null, answersCountValues);
      
    //     return answersCountKeys.filter((key) => answersCount[key] === maxAnswerCount);
    //   }

    //   setResults (result) {
    //     if (result.length === 1) {
    //       this.setState({ result: result[0] });
    //     } else {
    //       this.setState({ result: 'Undetermined' });
    //     }
    //   }
      render(){
    return (
        <div className="quiz">
          <QuestionCount
            counter={this.props.questionId}
            total={this.props.questionTotal}
          />
          <Question content={this.props.question} />
          <ul className="answerOptions">
            {this.props.answerOptions.map(this.renderAnswerOptions)}
          </ul>
        </div>
    );
      }
  }
  
  Quiz.propTypes = {
    answer: PropTypes.string.isRequired,
    answerOptions: PropTypes.array.isRequired,
    counter: PropTypes.number.isRequired,
    question: PropTypes.string.isRequired,
    questionId: PropTypes.number.isRequired,
    questionTotal: PropTypes.number.isRequired,
    onAnswerSelected: PropTypes.func.isRequired
  };
 
export default Quiz;