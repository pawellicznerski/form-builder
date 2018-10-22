import React, {Component} from 'react';

class QuestionForm extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    return(
      <div>
      <label htmlFor="d">Question: </label>
        <input
          onChange={this.props.handleChange.bind(this)}
          name='question'
          value={this.props.question}></input>
      </div>
    )
  }
}

export default QuestionForm;
