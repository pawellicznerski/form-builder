import React, {Component} from 'react';
import FormBuilder from './FormBuilder';

class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      showForms:false
    }
  }
  showForm(){
    console.log("dupa");
    console.log(this.state.showForms);
    this.setState({showForms:!this.state.showForms});


  }
  changeState(){
  }
  componentDidMount(){
    console.log("we are here");
    // this.setState({showForms:!this.state.showForms});

  }
  render(){
    if(this.state.showForms){
      return (
          <button onClick={this.showForm.bind(this)}> New form</button>
      )
    } else {
      return (
          <FormBuilder/>
      )
    }
  }
}
 export default Main;
