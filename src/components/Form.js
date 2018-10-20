import React, {Component} from 'react';

class Form extends Component{
  constructor(props){
    super(props)
    this.state={
      question:'',
      type:''
    }
  }
  handleChange(e) {
  this.setState({value: e.target.value});
  console.log(e.target);
  console.log(this.state.value);
  // e.preventDefault();
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;//potrzebne w razie dolączenia checkbox-a
  const name = target.name;
  // const nameWarning = `empty${name}FieldWarning`;

  this.setState({
     [name]: value,
   });
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.question,this.state.type);
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit.bind(this)}>
      <fieldset>
        <label forhtml="q">Question
         <input type="text" name="question" onChange={this.handleChange.bind(this)} id="q"/>
        </label>
        <label forhtml="type">Type
          <input type="text" name="type" onChange={this.handleChange.bind(this)} id="type"/>
        </label>
        <input  type="submit" value="send"/>
        <button>Delete</button>
      </fieldset>
      </form>
    )
  }
}

export default Form;
