import React, {Component} from 'react';
import TypeForm from './TypeForm';
import QuestionForm from './QuestionForm';
import ConditionForm from './ConditionForm';

class Form extends Component{
  constructor(props){
    super(props)
    this.state={
      value:'',
      id:this.props.id,
      type:this.props.type,
      question:this.props.question,
      condition:this.props.condition,
      subform:[this.props.subform]
    }
  }
  handleChange(e) {
  this.setState({value: e.target.value});
  console.log(e.target.value,e.target.name);
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;//potrzebne w razie dolączenia checkbox-a
  const name = target.name;

  this.setState({
     [name]: value,
   });
  }
  // handleSubmit(e){
  //   e.preventDefault();
  //   console.log("what?",this.state.question,this.state.type);
  // }
  // onSubmit={this.handleSubmit.bind(this)}?
  removeForm(e){
    e.preventDefault();
    const id = this.props.id;
    // console.log("id in form",id);
    this.props.removeForm("remove",id);
  }
showId(e){
  e.preventDefault();
  // const {id,type,question, condition} = this.state.form;
  // console.log("id", id);
}
addForm(e){
  e.preventDefault();
  const {id,type,question,condition,subform} = this.state;
  this.props.addForm("add",id,{id,type,question,condition,subform})
}
  render(){
    // console.log("it is rendered in form");
    const {question} = this.state;
    return(
      <form >
      <fieldset>

        <ConditionForm
          handleChange={this.handleChange.bind(this)}
          fatherType="radio"
          value={4}/>
        <QuestionForm
          handleChange={this.handleChange.bind(this)}
          question={question}/>
        <TypeForm
          handleChange={this.handleChange.bind(this)}
          type="radio"/>

        <button onClick={this.addForm.bind(this)}>Add subinput</button>
        <button onClick={this.removeForm.bind(this)}>Delete</button>
        <button onClick={this.showId.bind(this)}>sth</button>

    </fieldset>
      </form>
    )
  }
}

export default Form;
