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
  //
  // actionHandler(id,actionType,newData){
  //   // console.log("what",id, [actionType,newData]);
  //   // console.log("removefrom fn",id,actionType);
  //   const initialData= this.state.form?this.state.form:[];
  //   const props = [id,initialData,actionType,newData];
  //   const data = this.recursiveAction(...props);
  //   // console.log("data after:",data);
  //   this.setState({form:[...data]})
  // }
  // //
  // recursiveAction(id, data, actionType,newData) {
  //   // console.log("in recursive",id, data, actionType,newData);
  //   // if(!data.length||!newData&&actionType==="add"){
  //   //   newData=newData?newData:this.createDefaultForm();
  //   //   data.push(newData);
  //   //   return data;
  //   // }
  //   for(let i = 0; i < data.length; i++) {
  //       if (data[i].id === id) {
  //         // console.log("im heree");
  //         data = this.doAction(i,data,actionType,newData)
  //         // console.log("pokaż co obciołeś",data);
  //         return data;
  //       }else if (data[i].subform && data[i].subform.length) {
  //         // console.log("I found subform",data[i].subform);
  //         const props = [id,data[i].subform,actionType]
  //         const result =  this.recursiveAction(...props);
  //         if(result){data[i].subform=result; return data;}
  //       }
  //     // return data;
  //   }
  // }

  // doAction(i,data,actionType,newData){
  //   if(actionType==="remove"){
  //     console.log("bingooo");
  //     return [...data.slice(0,i),...data.slice(i + 1)]
  //   } else if (actionType==="add"){
  //     console.log("dupa");
  //     // if(!data) this.state.form.push(newData);
  //     // data=data.subform?data.subform:this.state.form;
  //     // data.push(newData)
  //     // return [...data.slice(0,i),...data.slice(i + 1)]
  //   } else if (actionType==="update"){
  //     return [...data.slice(0,i),...data.slice(i + 1)]
  //   }
  // }

  removeForm(id){
    const initialData= this.state.form?this.state.form:[];
    const updatedForm = this.recursiveAction(id, initialData);
    // console.log("id",id, "updatedForm", updatedForm);
    this.setState({form:[...updatedForm]})
  }
  recursiveAction(id, data) {
    // console.log("data",data);
    for(let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          // console.log("found...", data[i].id);
          return [...data.slice(0,i),...data.slice(i + 1)]
        }else if (data[i].subform && data[i].subform.length) {
          const result =  this.recursiveAction(id,data[i].subform);
          if(result){data[i].subform=result; return data;}
        }
      // return data;
    }
  }



addForm(id,newData){
  newData=newData.length?newData:this.createDefaultForm();
  const initialData= this.state.form?this.state.form:[];
  if(!id){
    initialData.push(newData);
    this.setState({form:initialData})
    return;
  }
  const updatedForm = this.recursiveAction2(id, initialData,newData);
  this.setState({form:[...updatedForm]})
  }

  recursiveAction2(id, data, newData) {
    for(let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          data[i].subform.push(newData);
          return [...data];
        }else if (data[i].subform && data[i].subform.length) {
          const result =  this.recursiveAction2(id,data[i].subform,newData);
          console.log('result',result);
          if(result){data[i].subform=result; return data;}
        }
    }
  }


//
updateForm(id,newData){
  const initialData= this.state.form?this.state.form:[];
  const updatedForm = this.recursiveAction(id, initialData);
  // console.log("id",id, "updatedForm", updatedForm);
  this.setState({form:[...updatedForm]})
}
recursiveAction3(id, data) {
  // console.log("data",data);
  for(let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        // console.log("found...", data[i].id);
        return [...data.slice(0,i),...data.slice(i + 1)]
      }else if (data[i].subform && data[i].subform.length) {
        const result =  this.recursiveAction3(id,data[i].subform);
        if(result){data[i].subform=result; return data;}
      }
    // return data;
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
         <button onClick={this.addForm.bind(this,'',[])}>Add form</button>
       </div>
    )
  }
}

export default FormBuilder;
