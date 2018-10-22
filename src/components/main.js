import React, {Component} from 'react';
import FormBuilder from './FormBuilder';

class Main extends Component{
  constructor(props){
    super(props);
    this.state={
      showForms:false
    }
  }
  // showForm(){
  //   console.log("dupa");
  //   console.log(this.state.showForms);
  //   this.setState({showForms:!this.state.showForms});
  //
  //
  // }
  // changeState(){
  // }
  // componentDidMount(){
  //   console.log("component main did mount");
  //   // this.setState({showForms:!this.state.showForms});
  //
  // }
  render(){
    return (
        <FormBuilder/>
    )
  }
}
 export default Main;
