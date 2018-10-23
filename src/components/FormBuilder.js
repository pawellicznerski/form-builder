import React, {Component} from 'react';
import Form from './Form';
import _ from 'lodash';


class FormBuilder extends Component{
  constructor(props){
    super(props);
    this.state={
      form:[
        {
        id:232,
        type:'text',
        question:"first oner",
        condition:{type:'',value:''},
        subform:[
          {
            id:233,
            type:'number',
            question:"second one",
            condition:{type:'text',value:'car'},
            subform:[
              {
                id:239,
                type:'text',
                question:"second one",
                condition:{type:'number',value:4},
                subform:[]
              },{

              }
            ]
          }
        ]
      },{
        id:234,
        type:'text',
        question:"second one",
        condition:{type:'',value:''},
        subform:[]
      },
      {

      }
     ]
    }
  }



removeForm(actionType, id){
  const initialData= this.state.form?this.state.form:[];
  const allData = [actionType,id, initialData];
  const updatedForm = this.recursiveAction(...allData);
  console.log("data from remove",updatedForm);
  this.setState({form:[...updatedForm]})
}

addForm(actionType,id,fatherType){
  const newData=this.createDefaultForm(fatherType);
  const initialData= this.state.form?this.state.form:[];
  if(!id){
    initialData.push(newData);
    this.setState({form:initialData})
    return;
  }
  const allData = [actionType,id, initialData,newData];
  let updatedForm = this.recursiveAction(...allData);
  console.log("data from add",updatedForm);

  if(!updatedForm)updatedForm=[];
  this.setState({form:[...updatedForm]})
  }

updateForm(actionType,id,value,nameOfNewData){
  // return;
  const initialData= this.state.form?this.state.form:[];
  const allData = [actionType,id, initialData, value,nameOfNewData];
  const updatedForm = this.recursiveAction(...allData);
  console.log("data from update",updatedForm);
  // console.log("id",id,typeof id, "updatedForm", updatedForm);
  // this.setState({form:[...updatedForm]})
}

recursiveAction(actionType,id, data, newData,nameOfNewData) {
  // console.log("data",data);
  for(let i = 0; i < data.length; i++) {
      if (data[i].id == id) {

        const allData =[actionType,data,i,newData,nameOfNewData]
        const result=this.setTheReturnValue(...allData);
        return result;
      }else if (data[i].subform && data[i].subform.length) {
        const allData =[actionType,id,data[i].subform,newData,nameOfNewData]
        const result =  this.recursiveAction(...allData);
        if(result){data[i].subform=result; return data;}
      }
    // return data;
  }
}

setTheReturnValue(actionType,data,i,newData,nameOfNewData){
  // console.log("actiontype",actionType);
  if(actionType==="remove"){
    return [...data.slice(0,i),...data.slice(i + 1)]
  } else if(actionType==="update"){
    // data[i].nameOfNewData=newData;
    // console.log("z set",data[i].nameOfNewData);
    // return [...data.slice(0,i),newData,...data.slice(i + 1)]
  } else if(actionType==="add"){
    data[i].subform.push(newData);
    return [...data];
  }
}

  createDefaultForm(fatherType){
    // console.log('fatherType',fatherType);
    const value = '';
    const conditionType= fatherType?fatherType:'';
      const id = Math.random().toString(16).slice(2);
      const form = this.state;
      const defaultForm ={
        id:id,
        type:'text',
        question:"question",
        condition:{type:conditionType,value:value},
        subform:[]
      }
      return defaultForm;
  }
  
  renderItems(form, layer) {
    _.remove(form,(item)=>Object.keys(item).length === 0);
    const i = layer===false||typeof layer !== "number"?0:layer+1;
      return form.map((item, index) => <div key={index}>
      <Form
        {...item}
        marginLeft={i}
        removeForm={this.removeForm.bind(this)}
        updateForm={this.updateForm.bind(this)}
        addForm={this.addForm.bind(this)}
        />
      {this.renderItems(item.subform,i)}
       </div>);
  }

  render(){
      const {form} = this.state;
      console.log("data from render Fbuilder",form);
    return(
       <div>
         {this.renderItems(form)}
         <button onClick={this.addForm.bind(this,'add','',[])}>Add form</button>
       </div>
    )
  }
}

export default FormBuilder;
