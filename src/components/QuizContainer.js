import React, { Component } from 'react';
import Quiz from './Quiz'
import Result from './Result'
import PropTypes from 'prop-types';

import Question from './Question';

class QuizContainer extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
          counter: 0,
          questionId: 1,
          question: '',
          answerOptions: [],
          answer: '',
          answersCount: {},
          result: ''
        };
      }

    //   componentDidMount() {
    //     const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));  
      
    //     this.setState({
    //       question: quizQuestions[0].question,
    //       answerOptions: shuffledAnswerOptions[0]
    //     });
    //   }

      shuffleArray(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      };

renderQuiz() {
    return (
      <Quiz
        answer={this.state.answer}
        answerOptions={this.state.answerOptions}
        questionId={this.state.questionId}
        question={this.state.question}
        // questionTotal={quizQuestions.length}
        onAnswerSelected={this.handleAnswerSelected}
      />
    );
  }
  
  renderResult() {
    return (
      <Result quizResult={this.state.result} />
    );
  }
    render() { 
        return (
    <div className="App">
      <div className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2>React Quiz</h2>
      </div>
      {this.state.result ? this.renderResult() : this.renderQuiz()}
    </div>
  );
    }
}
 
export default QuizContainer;