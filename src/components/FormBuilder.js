import React, {Component} from 'react';
import Form from './Form';


class FormBuilder extends Component{
  constructor(props){
    super(props);
    this.state={
      form:[{
        id:1,
        type:'text',
        question:"What car",
        condition:'',
        subform:[{
          id:1,
          type:'text',
          question:"What car",
          condition:'',
          subform:[]
        }]
      },{
        id:2,
        type:'text',
        question:"What car",
        condition:'',
        subform:[]
      }
     ]
    }
  }


  renderItems(form) {
    console.log("form in reneder items",form);
    if(!form)return ;
      return form.map((item, index) => <div key={index}>
      <Form
        {...item}
        addForm={this.addForm.bind(this)}
        removeForm={this.removeForm.bind(this)}
        />
      {this.renderItems(item.subform)}
       </div>);
  }

  updateForm(updatedForm){

  }

  addForm(){
      const newForm ={
        id:2,
        type:'text',
        question:"What car",
        condition:'',
        subform:[]
      }
    this.setState({
      form:[...this.state.form,newForm],
    })
    // console.log("the whole state",this.state.form);
  }

  removeForm(){

  }


  render(){
    return(
       <div>
         {this.renderItems(this.state.form)}
         <button onClick={this.addForm.bind(this)}>Add form</button>
       </div>
    )
  }
}

export default FormBuilder;
