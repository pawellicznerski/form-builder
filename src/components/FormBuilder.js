import React, {Component} from 'react';
import Form from './Form';
import _ from 'lodash';
import data  from './data';
import data2  from './data2';


class FormBuilder extends Component{
  constructor(props){
    super(props);
    this.state={
      form:data,
    }
  }
  componentDidMount(){

    var request, db;
    request = window.indexedDB.open("library",1);

        request.onerror= (event) => {
          alert("Could not open Indexed DB due to error: " + this.errorCode);
        };

      request.onupgradeneeded = function(event) {

      // The database did not previously exist, so create object stores and indexes.
      console.log('request', request.result);
      var db = request.result;
      var store = db.createObjectStore("books", {keyPath: "id"});
      // { autoIncrement: true }
      var titleIndex = store.createIndex("by_type", "type", {unique: false});
      var authorIndex = store.createIndex("by_question", "question");

      // var titlesArr = [{title: "Quarry Memories", author: "Fred", isbn: 123456},{title: "Water Buffaloes", author: "Fred", isbn: 234567},{title: "Bedrock Nights", author: "Barney", isbn: 345678}]

      // Populate with initial data.
      console.log("titlearrrrrrrrrr-----", data2);
      // store.put({
      //     id:232,
      //     type:'text',
      //     question:"first oner",
      //     conditionType:'',
      //     conditionOption:'',
      //     conditionValue:'',
      //     subform:[]
      //   });
      console.log('gggggggggggggggggg', data2, ...data2);
      store.put(...data2);

      // store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
      // store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
      // store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});
      alert("onupgrade")
    };

    request.onsuccess = function(event) {
            window.indexedDB.deleteDatabase("library");
            db =  this.result;
            console.log("this.resultifjoiwejfoijwe",this.result, event.target.result);

      // console.log('request', request.result);
      db = event.target.result;
      console.log("dbibibibibibibib", db);
      const dupa = "text";

      var tx = db.transaction("books", "readonly");
      var store = tx.objectStore("books");
      console.log("storeeeeeeeeeee", store);
      var index = store.index("by_type");
      console.log("indexxxxxxxxx", index);
      var request = index.get(dupa);
      request.onsuccess = function(event) {
        var matching = this.result;
        console.log("matching", matching);
        if (matching !== undefined) {
          // A match was found.
          console.log(matching.id, matching.type, matching.question);
        } else {
          // No match was found.
          console.log(null);
        }
      };


          db.transaction.oncomplete = () =>{
                db.close();
            }
            alert("onsuccess")
    };






    // var tx = db.transaction("books", "readonly");
    // var store = tx.objectStore("books");
    // var index = store.index("by_author");
    //
    // var request = index.openCursor(IDBKeyRange.only("Fred"));
    // request.onsuccess = function() {
    //   var cursor = request.result;
    //   if (cursor) {
    //     // Called for each matching record.
    //     console.log(cursor.value.isbn, cursor.value.title, cursor.value.author);
    //     cursor.continue();
    //   } else {
    //     // No more matching records.
    //     console.log(null);
    //   }
    // };








    return;
//     let database, request;
//     request = window.indexedDB.open("form-db", 1);
//     request.onerror= (event) => {
//       alert("Could not open Indexed DB due to error: " + this.errorCode);
//     };
// // UPGRADEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE
//     request.onupgradeneeded = function(event) {
//       // console.log("thissssssssssssssss",this);
//       let storage =event.target.result.createObjectStore("formData", { autoIncrement: true });
//       var typeIndex = storage.createIndex("by_type", "type", {unique: false});
//
//       // var myId = storage.createIndex("by_id", "id", {unique: true});
//       // var subformIndex = storage.createIndex("by_subform", "author");
//       console.log("ekdopekd data", data);
//       storage.put(data, 'formData');
//       console.log("storageeeeeeeeeeee", storage);
//       alert("Creating a new database!");
//     };
//   // SUCCESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS
//     request.onsuccess = (event) => {
//       window.indexedDB.deleteDatabase("form-db");
//       database =  request.result;
//       console.log("this.resultifjoiwejfoijwe",event.target.result);
//
//       database =  request.result;
//       let storage = database.transaction("formData", "readwrite").objectStore("formData");
//
//       storage.get("formData").onsuccess = (event)=> {
//         console.log("storage.result>>>>>>>",event.target.result);
//       this.setState({
//         form:event.target.result
//         })
//       };
//
//       database.transaction.oncomplete = () =>{
//             database.close();
//         }
//     };
//   }
//
//   handleDBUpdate(updatedForm){
//     let database, request;
//     request = window.indexedDB.open("form-db", 1);
//   // var authorIndex = store.createIndex("by_author", "author");
//
//     request.addEventListener("error", function(event) {
//       alert("Could not open Indexed DB due to error: " + this.errorCode);
//     });
//     request.onsuccess = (event) => {
//       let db = event.target.result;
//       // let storage = db.transaction("formData", "readwrite").objectStore("formData");
//       // storage.get("formData").addEventListener("success", function(event) {
//       //   storage.put(updatedForm, "formData");
//       // });
//       console.log("dbbbbbbbbbbb---",db);
//         var tx = db.transaction("formData", "readonly");
//         console.log("txxxxxxxxxx---",tx);
//       var store = tx.objectStore("formData");
//       console.log("storeeeeeeeee---",tx);
//
//       var index = store.index("by_type");
//       console.log("indexxxxxx---",index);
// // 53a46cd9d719e
//
// var request = index.getAllKeys();
// request.onsuccess = function() {
//   var matching = request.result;
//   if (matching !== undefined) {
//     // A match was found.
//         console.log('jestem jhuuuuu',matching);
//   } else {
//     // No match was found.
//     console.log('jestem jhuuuuu  dupa',matching);
//   }
// };
//
//
//       // var request = index.openCursor(IDBKeyRange.only("type"));
//       // request.onsuccess = function() {
//       //   var cursor = request.result;
//       //   console.log("cursorrrrrrrrrrrr------",cursor);
//       //   if (cursor) {
//       //     // Called for each matching record.
//       //     console.log('jestem jhuuuuu',cursor.value.type, cursor.value.id);
//       //     cursor.continue();
//       //   } else {
//       //     // No more matching records.
//       //     console.log('null');
//       //   }
//       // };
//
      // db.transaction.oncomplete = () =>{
      //       database.close();
      //   }
//   }
//
//
//
//
//
//
// function testIt() {
//
//   console.log();
//
//   var req = indexedDB.open('test', 1);
//
//   req.onupgradeneeded = function (e) {
//     var db = e.target.result;
//
//     if (db.objectStoreNames.contains('test')) {
//       db.deleteObjectStore('test');
//     };
//
//     db.createObjectStore('test', {keyPath: 'id'});
//   }
//   req.onsuccess = function (e) {
//     var db = e.target.result;
//
//     var depth = parseInt(23, 10);
//     console.log('Building a deeply-nested object of depth ' + depth + '...');
//     var obj = createDeeplyNestedObject(depth);
//     console.log('Built a deeply-nested object.');
//     var txn = db.transaction(['test'], 'readwrite');
//
//     console.log('Trying to insert deeply-nested object...');
//     var putReq = txn.objectStore('test').put(obj);
//     putReq.onsuccess = function() {
//       console.log('Successfully inserted deeply-nested object');
//       var getReq = txn.objectStore('test').get('foo');
//       getReq.onsuccess = function () {
//         console.log('Successfully retrieved deeply-nested object');
//       }
//       getReq.onerror = console.log;
//     }
//
//     putReq.onerror = console.log;
//
//     txn.oncomplete = function () {
//       console.log('Transaction finished');
//     };
//     txn.onerror = console.log;
//   };
//
//   req.onerror = console.log;
// }
//
//
// function createDeeplyNestedObject(depth) {
//   var obj = {id: 'foo'};
//   var key = obj;
//   for (var i = 0; i < depth; i++) {
//     key = key[i] = {};
//   }
//   return obj;
// }
//
//




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
