import React, { Component } from 'react';
import Quiz from './Quiz'

class QuizContainer extends Component {
  state = {
      showQuiz: false
  }

  showQuiz = () => {
    this.setState({
      showQuiz: true
    })
  }

  render() { 
      return (
        <>
        <div className="quiz-content">
          <h2>Hatshepsut's Final Resting Place</h2>
          <p>Answer at least 80% of questions correctly to get to the Queen's tomb...</p>
        </div>
        
        {this.state.showQuiz ? 
        <Quiz closeQuiz={this.props.closeQuiz} />
        : 
        <button onClick={this.showQuiz}>Begin!</button>
        }
        </>
    );
  }
}
 
export default QuizContainer;