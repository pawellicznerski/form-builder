import React, {Component} from 'react';
import Form from './Form';
import _ from 'lodash';
import data  from './data';





class FormBuilder extends Component{
  constructor(props){
    super(props);
    this.state={
      form:''
    }
  }
  componentDidMount(){
            let self = '';
            // all the variables to run our database
            // let self;
            console.log("selfjeden---",self);
            var database, idb_request;
            // request to open the specified database by name and version number
            // if version number changes, the database is updated
            idb_request = window.indexedDB.open("form-db", 1);
            // if there is an error, tell the user
            idb_request.addEventListener("error", function(event) {
              alert("Could not open Indexed DB due to error: " + this.errorCode);
            });
            /* if the database you specified cannot be found or the version number
            is old, you will need an upgrade to create the new database schema */
// UPGRADEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
            idb_request.onupgradeneeded = function(event) {
              /* Here we create a new object store called data, and give it an auto-
              generated key path */
              var storage = this.result.createObjectStore("formData", { autoIncrement: true });
              // add an object to the "formData" objectStore with the key, "form"
              storage.add(data, "form");
              alert("Creating a new database!");
            };
            // if you successfully open the database use this callback function
  // SUCCESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
            idb_request.onsuccess = (event)=> {
              console.log("self---",self);


              database = this.result;// store the database for later use
              // now we are going to use some data from our database
              console.log("new database",this.result.transaction('formData','readwrite').objectStore('formData').get("form"));
              // window.indexedDB.deleteDatabase("form-db");
              // database.close();

              // return;


              let storage = database.transaction("formData", "readwrite").objectStore("formData");

              storage.get("form").onsuccess = (event)=> {
                console.log("database.result",database.result);
          //  that.setState({
          //     form:self
          //   })
          self = this.result;
                console.log("seljoijf---",self);
                // background = document.body.style.backgroundColor = this.result.color;
                // document.getElementById("date").innerHTML = this.result.date;
                // presses = document.getElementById("presses").innerHTML = this.result.presses;
                // this.result.date = new Date().toString();
                // storage.put(this.result, "form");
              };
              console.log("storage=====", storage);
              alert("Successfully opened database!");
              database.transaction.oncomplete = function(){
                    database.close();
                }
            };
            console.log("ostatni self", self);

            // this.setState({
            //   form:self
            // })
  // FORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
            // // all the variables to run our application
            // var buttons, background, presses;
            // // get the array of buttons, which are just a elements:
            // buttons = document.querySelectorAll("a");
            // // set presses equal to zero (this will be reset if our database loads):
            // presses = 0;
            // // loop through all the buttons:
            // for (let index = buttons.length - 1; index > -1; -- index) {
            //   // add a click listener to each button:
            //   buttons[index].addEventListener("click", function(event) {
            //     // Clear the database if the X button is pressed:
            //     if (database && this.innerHTML == "X") {
            //       window.indexedDB.deleteDatabase("indexed-db");
            //       database = undefined;
            //       // set up html for the white screen after deleting database
            //       document.getElementById("button-container").style.visibility = "hidden";
            //       document.querySelector("h1").innerHTML = "You just deleted the database! Refresh the page to create a new one.";
            //       document.querySelector("h1").style = "color:" + background;
            //       document.body.style.backgroundColor = "#ffffff";
            //       return;
            //     } else if (database) { // if the database was established
            //       presses ++;
            //       // when a button is clicked, store its background color for saving:
            //       background = this.style.backgroundColor;
            //       // change the background color of the page to the button's color:
            //       document.body.style.backgroundColor = background;
            //       document.getElementById("presses").innerHTML = presses;
            //       // save the new data to the database in the objectStore, "data"
            //       var storage = database.transaction("data", "readwrite").objectStore("data");
            //       // get returns the object pointed to by the key, "form"
            //       storage.get("form").addEventListener("success", function(event) {
            //         // this.result is the object "form" was pointing to
            //         this.result.color = background;
            //         this.result.presses = presses;
            //         // put writes the changed object back to the "data" objectStore
            //         storage.put(this.result, "form");
            //       });
            //     }
            //   });
            // }
  }

fetchedDataToForm(data){
  this.setState({
    form:data
  })
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
g
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
