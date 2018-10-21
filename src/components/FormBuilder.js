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
        subform:[{
          id:1,
          type:'text',
          question:"What car",
          subform:[]
        }]
      },{
        id:2,
        type:'text',
        question:"What car",
        subform:[]
      }
     ]
    }
  }


  renderItems(form) {
    if(!form.length)return ;
      return form.map((item, index) => <div key={index}>
      <Form
        {...item}
        />
      {this.renderItems(item.subform)}
       </div>);
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
