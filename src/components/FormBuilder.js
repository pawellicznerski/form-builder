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
        subform:[]
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

    console.log("render item in buider",form);
      return form.map((item, index) => <div key={index}>
      <Form
        {...item}
        addForm={this.addForm.bind(this)}
        removeForm={this.removeForm.bind(this)}
        />
      // {this.renderItems(item.subform)}
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
    const data= this.state.form?this.state.form:[]
    if(data.length===1)
    {console.log("dta.length jest 1");
      this.setState({form:[]})}
    else
    console.log("data before:",data);
    _.remove(data, item =>item.id===id);
    console.log("data after:",data);
    this.setState({form:[...data]})

    // let data = this.changeFormList(id, this.state.form);
    // // console.log("id in formbuider",id, "and data", data);
    // // const changedForms =
    // console.log("data before set state",data);
    // this.setState({form:data});
    // console.log(this.state.form);
  }
  //
  // changeFormList(id, data) {
  //   console.log("data in change form",data, "id", id);
  //     for(let i = 0; i < data.length; i++) {
  //         if (data[i].id === id) {
  //           console.log("dupa",[...data.slice(0,i),...data.slice(i + 1)]);
  //           data = [...data.slice(0,i),...data.slice(i + 1)]
  //           console.log("data po slice",data);
  //         } else if (data[i].subform && data[i].subform.length) {
  //           console.log("I found subform",data[i].subform);
  //           data[i].subform =  this.changeFormList(id,data[i].subform);
  //
  //         }
  //     }
  //     console.log("ostatni return w change",data);
  //     return data;
  //
  //
  // }

  // removeForm(id) {
  //   return arr.find(a => {
  //       if (a.children && a.children.length > 0) {
  //           return a.id === id ? true : findById(a.children, id)
  //       } else {
  //           return a.id === id
  //       }
  //   })

// }

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
