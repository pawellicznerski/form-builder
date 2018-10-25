import React, {Component} from 'react';
import Form from './Form';
import _ from 'lodash';
import data from './data';
import idb from 'idb';

// await idb.open(…);

const name = 'mydbname'
const version = 1 //versions start at 1
idb.open(name, version, upgradeDb => {})


class FormBuilder extends Component{
  constructor(props){
    super(props);
    this.state={
      form:data
    }
  }

removeForm(actionType, id){
  const initialData= this.state.form?this.state.form:[];
  const allData = [actionType,id, initialData];
  const updatedForm = this.recursiveAction(...allData);
  console.log("data from remove",updatedForm);
  this.setState({form:[...updatedForm]})
}


updateForm(actionType,id,value,nameOfNewData){
  // return;
  const initialData= this.state.form?this.state.form:[];
  const allData = [actionType,id, initialData, value,nameOfNewData];
  const updatedForm = this.recursiveAction(...allData);
  console.log("data from update",updatedForm);

  // console.log("id",id,typeof id, "updatedForm", updatedForm);
  this.setState({form:[...updatedForm]})
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
    data[i][nameOfNewData]=newData;
    // console.log('data[i][nameOfNewData]',data[i][nameOfNewData]);
    if(nameOfNewData=="type"&&data[i].subform.length){
      // console.log('jeeeesteeee if');

      for (let j = 0; j < data[i].subform.length; j++) {
        // console.log('jeeeesteeee for');

          // console.log('data[i].subform[j]',data[i].subform[j]);
          data[i].subform[j].conditionType=newData
          // console.log("newData, data[i].subform[j].conditionType", newData,data[i].subform[j].conditionType);
        }
    }
    return data;
  } else if(actionType==="add"){
    data[i].subform.push(newData);
    return [...data];
  }
}

addForm(actionType,id,fatherType,fatherConditionValue){
  const newData=this.createDefaultForm(fatherType,fatherConditionValue);
  const initialData= this.state.form?this.state.form:[];
  if(!id){
    newData.conditionType='';
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


  createDefaultForm(fatherType,fatherConditionValue){
    console.log('fatherType',fatherType);
     let conditionOption= fatherType?fatherType:'text';
    console.log("conditionOption",conditionOption);
    // const defaultType =fatherType?fatherType:'';
      const id = Math.random().toString(16).slice(2);
      // const form = this.state;
      const defaultForm ={
        id:id,
        type:'text',
        question:"Your question",
        conditionType:conditionOption,
        conditionOption:'Equals',
        conditionValue:'',
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
g
  render(){
      const {form} = this.state;
      // console.log("data from render Fbuilder",form);
    return(
       <div>
         {this.renderItems(form)}
         <button onClick={this.addForm.bind(this,'add','',"new")}>Add form</button>
       </div>
    )
  }
}

export default FormBuilder;
