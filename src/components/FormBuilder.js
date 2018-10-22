import React, {Component} from 'react';
import Form from './Form';
import _ from 'lodash';


class FormBuilder extends Component{
  constructor(props){
    super(props);
    this.state={
      form:[{
        id:143,
        type:'text',
        question:"first oner",
        condition:'',
        subform:[
          {
            id:342,
            type:'text',
            question:"second one",
            condition:'',
            subform:[]
          }
        ]
      },{
        id:34,
        type:'text',
        question:"second one",
        condition:'',
        subform:[]
      }
     ]
    }
  }


  renderItems(form) {
    // console.log("form in reneder items",form);
    // if(!form)return ;

    // console.log("render item in buider",form);
      return form.map((item, index) => <div key={index}>
      <Form
        {...item}
        addForm={this.addForm.bind(this)}
        removeForm={this.removeForm.bind(this)}
        />
      {this.renderItems(item.subform)}
       </div>);
  }
  // componentDidMount(){
  //   this.setState({form:this.state.form})
  //
  // }
  // updateForm(updatedForm){
  //
  // }

  addForm(){
      const id = Math.random().toString(16).slice(2);
      const newForm ={
        id:id,
        type:'text',
        question:"What car",
        condition:'',
        subform:[]
      }
      const form2 = this.state.form;
      form2.push(newForm)
    this.setState({
      form:form2,
    })
    // console.log("the whole state",this.state.form);
  }
  //
  removeForm(id){
    const initialData= this.state.form?this.state.form:[];
    const data = this.changeFormList(id,initialData);

    // console.log("data after:",data);
    this.setState({form:[...data]})
  }
  //
  changeFormList(id, data) {

    for(let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          data = [...data.slice(0,i),...data.slice(i + 1)]
          return data;
        }else if (data[i].subform && data[i].subform.length) {
          // console.log("I found subform",data[i].subform);
          data[i].subform =  this.changeFormList(id,data[i].subform);
          return data;
        }

    }
  }


  render(){
      const {form} = this.state;
    return(
       <div>
         {this.renderItems(form)}
         <button onClick={this.addForm.bind(this)}>Add form</button>
       </div>
    )
  }
}

export default FormBuilder;
