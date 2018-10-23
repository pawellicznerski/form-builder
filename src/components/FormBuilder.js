import React, {Component} from 'react';
import Form from './Form';
import _ from 'lodash';


class FormBuilder extends Component{
  constructor(props){
    super(props);
    this.state={
      form:[{
        id:232,
        type:'text',
        question:"first oner",
        condition:'',
        subform:[
          {
            id:233,
            type:'text',
            question:"second one",
            condition:'',
            subform:[]
          }
        ]
      },{
        id:234,
        type:'text',
        question:"second one",
        condition:'',
        subform:[]
      }
     ]
    }
  }


  renderItems(form) {
      return form.map((item, index) => <div key={index}>
      <Form
        {...item}
        removeForm={this.removeForm.bind(this)}
        addForm={this.addForm.bind(this)}
        />
      {this.renderItems(item.subform)}
       </div>);
  }


removeForm(actionType, id){
  const initialData= this.state.form?this.state.form:[];
  const updatedForm = this.recursiveAction(actionType,id, initialData);
  this.setState({form:[...updatedForm]})
}

addForm(actionType,id,newData){
  newData=newData.length?newData:this.createDefaultForm();
  const initialData= this.state.form?this.state.form:[];
  if(!id){
    initialData.push(newData);
    this.setState({form:initialData})
    return;
  }
  const updatedForm = this.recursiveAction(actionType,id, initialData,newData);
  this.setState({form:[...updatedForm]})
  }

updateForm(actionType,id,newData){
  const initialData= this.state.form?this.state.form:[];
  const updatedForm = this.recursiveAction(actionType,id, initialData, newData);
  // console.log("id",id, "updatedForm", updatedForm);
  this.setState({form:[...updatedForm]})
}



recursiveAction(actionType,id, data, newData) {
  console.log("data",data);
  for(let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        const result=this.setTheReturnValue(actionType,data,i,newData);
        return result;
      }else if (data[i].subform && data[i].subform.length) {
        const result =  this.recursiveAction(actionType,id,data[i].subform,newData);
        if(result){data[i].subform=result; return data;}
      }
    // return data;
  }
}

setTheReturnValue(actionType,data,i,newData){
  console.log("actiontype",actionType);
  if(actionType==="remove"){
    return [...data.slice(0,i),...data.slice(i + 1)]
  } else if(actionType==="update"){
    return [...data.slice(0,i),newData,...data.slice(i + 1)]
  } else if(actionType==="add"){
    data[i].subform.push(newData);
    return [...data];
  }
}




  createDefaultForm(){
      const id = Math.random().toString(16).slice(2);
      const form = this.state;
      const defaultForm ={
        id:id,
        type:'text',
        question:"question",
        condition:'equal',
        subform:[]
      }
      return defaultForm;
  }


  render(){
      const {form} = this.state;
    return(
       <div>
         {this.renderItems(form)}
         <button onClick={this.addForm.bind(this,'add','',[])}>Add form</button>
       </div>
    )
  }
}

export default FormBuilder;
