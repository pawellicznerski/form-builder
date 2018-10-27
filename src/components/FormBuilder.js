import React, {Component} from 'react';
import Form from './Form';
import _ from 'lodash';
import data  from './data';


// const obj2 = createDeeplyNestedObject(10);
//
// function createDeeplyNestedObject(depth) {
//   var obj = {id: 'foo'};
//   var key = obj;
//   for (var i = 0; i < depth; i++) {
//     key = key[i] = {};
//   }
//   return obj;
// }
// console.log('object::::',obj2);


class FormBuilder extends Component{
  constructor(props){
    super(props);
    this.state={
      form:'',
    }
  }
  componentDidMount(){
    let database, request;
    request = window.indexedDB.open("form-db", 1);
    request.onerror= (event) => {
      alert("Could not open Indexed DB due to error: " + this.errorCode);
    };
// UPGRADEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
    request.onupgradeneeded = function(event) {
      // console.log("thissssssssssssssss",this);
      let storage =event.target.result.createObjectStore("formData", { autoIncrement: true });
      // var myId = storage.createIndex("by_id", "id", {unique: true});
      // var subformIndex = storage.createIndex("by_subform", "author");
      console.log("ekdopekd data", data);
      storage.put(data, 'formData');
      console.log("storageeeeeeeeeeee", storage);
      alert("Creating a new database!");
    };
  // SUCCESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
    request.onsuccess = (event) => {
      // window.indexedDB.deleteDatabase("form-db");
      // database =  request.result;
      // console.log("this.resultifjoiwejfoijwe",event.target.result);

      database =  request.result;
      let storage = database.transaction("formData", "readwrite").objectStore("formData");

      storage.get("formData").onsuccess = (event)=> {
        console.log("storage.result>>>>>>>",event.target.result);
      this.setState({
        form:event.target.result
        })
      };

      database.transaction.oncomplete = () =>{
            database.close();
        }
    };
  }

  handleDBUpdate(updatedForm){
    let database, request;
    request = window.indexedDB.open("form-db", 1);
    request.addEventListener("error", function(event) {
      alert("Could not open Indexed DB due to error: " + this.errorCode);
    });
    request.onsuccess = (event) => {
      let db = event.target.result;
      let storage = db.transaction("formData", "readwrite").objectStore("formData");
      storage.get("formData").addEventListener("success", function(event) {
        storage.put(updatedForm, "formData");
      });
      db.transaction.oncomplete = () =>{
            database.close();
        }
  }
}


removeForm(actionType, id){
  const initialData= this.state.form?this.state.form:[];
  const allData = [actionType,id, initialData];

  const updatedForm = this.recursiveAction(...allData);
  // console.log("data from remove",updatedForm);
  this.setState({form:[...updatedForm]})
  this.handleDBUpdate(updatedForm);

}


updateForm(actionType,id,value,nameOfNewData){
  // return;
  const initialData= this.state.form?this.state.form:[];
  const allData = [actionType,id, initialData, value,nameOfNewData];
  const updatedForm = this.recursiveAction(...allData);
  // console.log("data from update",updatedForm);
  // console.log("id",id,typeof id, "updatedForm", updatedForm);
  this.setState({form:[...updatedForm]})
  this.handleDBUpdate(updatedForm);

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
          data[i].subform[j].conditionType=newData
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
  // console.log("data from add",updatedForm);

  if(!updatedForm)updatedForm=[];
  this.setState({form:[...updatedForm]})
  this.handleDBUpdate(updatedForm);

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
    _.remove(form,(item)=>Object.keys(item).length === 0||typeof item !=="object");
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
      // console.log("data from render Fbuilder",form);
      if(this.state.form){
        return(
           <div>
             {this.renderItems(form)}
             <div id="date"></div>
             <div id="presses"></div>
             <button onClick={this.addForm.bind(this,'add','',"new")}>Add form</button>
           </div>
        )
      } else{
        return(
           <div>
             <button onClick={this.addForm.bind(this,'add','',"new")}>Add form</button>
           </div>
        )
      }

  }
}

export default FormBuilder;
