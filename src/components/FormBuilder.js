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
        subform:{
          id:1,
          type:'text',
          question:"What car",
        }
      },{
        id:2,
        type:'text',
        question:"What car",
      }
      ]
    }
  }


  renderItems(form) {
      return form.map((item, index) => <div>
      <Form key={index} />
      // this.renderItems(item)
      </div>);
      // return (
      //   <Form/>
      // )
  }
  render(){
    return(
       <div>
         {this.renderItems(this.state.form)}
       </div>
    )
  }
}

export default FormBuilder;
