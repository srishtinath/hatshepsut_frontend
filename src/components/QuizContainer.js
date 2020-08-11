import React, { Component } from 'react';
import Quiz from './Quiz'
import quizQuestions from './quizQuestions';

class QuizContainer extends Component {
    constructor(props) {
        super(props);
      
        this.state = {
         showQuiz: false
        };
      }

      componentDidMount() {
        const shuffledAnswerOptions = quizQuestions.map((question) => this.shuffleArray(question.answers));  
      
        this.setState({
          question: quizQuestions[0].question,
          answerOptions: shuffledAnswerOptions[0]
        });
      }

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

    showQuiz = () => {
      this.setState({
        showQuiz: true
      })
    }

renderQuiz() {
    return (
      <Quiz closeQuiz={this.props.closeQuiz} />
    );
  }
    render() { 
        return (
          <>
          <div className="quiz-content">
            <h2>Hatshepsut's Final Resting Place</h2>
            <p>Answer more than 80% of questions correctly to get to the Queen's tomb...</p>
          </div>
          {this.state.showQuiz ? 
          <>
          {this.renderQuiz()}
          </>
          : 
          <button onClick={this.showQuiz}>Begin!</button>
          }
          </>
      );
    }
}
 
export default QuizContainer;