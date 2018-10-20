import React, {Component} from 'react';

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
    return (
        <button onClick={this.showForm.bind(this)}> New form</button>
    )
  }
}
 export default Main;
