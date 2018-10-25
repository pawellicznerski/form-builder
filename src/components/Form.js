import React, {Component} from 'react';
import TypeForm from './TypeForm';
import QuestionForm from './QuestionForm';
import ConditionForm from './ConditionForm/ConditionForm';

class Form extends Component{
  constructor(props){
    super(props)
    this.state={
      value:'',
      id:this.props.id,
      type:this.props.type,
      question:this.props.question,
      conditionType:this.props.conditionType,
      conditionOption:this.props.conditionOption,
      conditionValue:this.props.conditionValue,
      subform:this.props.subform
    }
  }

  handleChange(item,optionStateName){
    console.log("item", item);
    this.setState({
      [optionStateName]:item
    })
    this.createObjAndSend(optionStateName,item);
    console.log("all form", this.state);
  }

  createObjAndSend(optionStateName,item){
    const {id} = this.state;
    this.props.updateForm("update",id,item,optionStateName)
  }

  removeForm(e){
    e.preventDefault();
    const id = this.props.id;
    this.props.removeForm("remove",id);
  }

  showId(e){
    e.preventDefault();
    // const {id,type,question, condition} = this.state.form;
    // console.log("id", id);
    console.log("this.state",this.state);
  }

  addForm(e){
    e.preventDefault();
    const {id,conditionType,conditionValue,type} = this.state;
    console.log("conditionType in addForm in Form ----",type);
    this.props.addForm("add",id,type,conditionValue)
  }

  render(){
    // console.log("it is rendered in form");
    const {question} = this.state;
    const style = `${this.props.marginLeft*10}`;
    // const {conditionType,conditionValue,conditionOption} = this.state;
    const conditions = {
      conditionType:this.props.conditionType,
      conditionValue:this.props.conditionValue,
      conditionOption:this.props.conditionOption,
      id:this.props.id
    }
    console.log("jestem tu??id",conditions.id);
    // console.log("this.props.marginLeft", this.props.marginLeft);
    return(
      <form style={{marginLeft:`${style}px`,}}>
      <fieldset>
        <ConditionForm
          handleMouseDown={this.handleChange.bind(this)}
          conditions={conditions}/>
        <QuestionForm
          handleChange={this.handleChange.bind(this)}
          question={question}/>
        <TypeForm
          handleMouseDown={this.handleChange.bind(this)}
          type={this.state.type}/>
        <button
          onClick={this.addForm.bind(this)}>Add subinput</button>
        <button
          onClick={this.removeForm.bind(this)}>Delete</button>
        <button
          onClick={this.showId.bind(this)}>sth</button>

    </fieldset>
      </form>
    )
  }
}

export default Form;
