import React, {Component} from 'react';

class QuestionForm extends Component{
  constructor(props){
    super(props);
    this.state={
       question: this.props.question
    }
  }
  handleChange(e) {
  const {target} = e;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  this.setState({
     question: value,
   });
    this.props.handleChange(e.target.value,'question')
  }

  render(){
    return(
      <div>
      <label htmlFor="d">Question: </label>
        <input
          onChange={this.handleChange.bind(this)}
          name='question'
          value={this.state.question}></input>
      </div>
    )
  }
}

export default QuestionForm;
