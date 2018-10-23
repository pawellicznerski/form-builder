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
      conditionType:this.props.condition.type,
      conditionValue:this.props.condition.value,
      subform:this.props.subform
    }
  }
  handleChange(e) {
  this.setState({value: e.target.value});
  // console.log(e.target.value,e.target.name);
  const {target} = e;
  const value = target.type === 'checkbox' ? target.checked : target.value;//potrzebne w razie dolączenia checkbox-a
  const {name,id} = target;
  // console.log("target",target);

// actionType,id,value,nameOfNewData
  if(name==="type"){}


  this.setState({
     [name]: value,
   });
   this.sendUpdatedObj();
  //  console.log("jjjjjjjj", this.state.condition.value);
  }

  sendUpdatedObj(){
    const objToUpdate = this.state;
    // objToUpdate.type
    const {subform} = this.state;
    // subform.children.type=objToUpdate.type;
    subform.map((item,index)=> {item.type=objToUpdate.type;})
    console.log("form in form",objToUpdate.type);
    console.log("form in form",subform);

    // this.props.updateForm('update',this.state.id,[this.state.conditionType,this.state.conditionValue],);

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
  console.log("this.props.marginLeft",this.props.marginLeft);
}
addForm(e){
  e.preventDefault();
  const {id,type} = this.state;
  this.props.addForm("add",id,type)
}

// <form style={{marginLeft:`${this.props.marginLeft*310}px`}}>


  render(){
    // console.log("it is rendered in form");
    const {question} = this.state;
    const style = `${this.props.marginLeft*10}`;
    // console.log("jestem tu??");
    // console.log("this.props.marginLeft", this.props.marginLeft);
    return(
      <form style={{marginLeft:`${style}px`}}>
      <fieldset>
        <ConditionForm
          handleChange={this.handleChange.bind(this)}
          conditionType={this.state.conditionType}
          conditionValue={this.state.conditionValue}
          id={this.props.id}/>
        <QuestionForm
          handleChange={this.handleChange.bind(this)}
          question={question}/>
        <TypeForm
          handleChange={this.handleChange.bind(this)}
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
