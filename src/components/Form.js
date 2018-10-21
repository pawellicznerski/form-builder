import React, {Component} from 'react';
import TypeForm from './TypeForm';
import QuestionForm from './QuestionForm';
import ConditionForm from './ConditionForm';

class Form extends Component{
  constructor(props){
    super(props)
    this.state={

        id:this.props.id,
        type:this.props.type,
        question:this.props.question,
        condition:this.props.condition,
        subform:[this.props.subform]

    }
  }
  handleChange(e) {
  this.setState({value: e.target.value});
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;//potrzebne w razie dolączenia checkbox-a
  const name = target.name;

  this.setState({
     [name]: value,
   });
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.question,this.state.type);
  }

  render(){
    // console.log("props",this.props.question, this.state.question);
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
      <fieldset>

        <ConditionForm fatherType="radio" value={4}/>
        <QuestionForm question="What the f*?"/>
        <TypeForm type="number"/>

        <button onClick={this.props.addForm.bind(this)}>Add subinput</button>
        <button onClick={this.props.removeForm.bind(this)}>Delete</button>
      </fieldset>
      </form>
    )
  }
}

export default Form;
