import React, {Component} from 'react';

class TextForm extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  renderOption(){
    return(
      <option>dupa</option>
    )
  }

  render(){
    return(
      <div>
      <label htmlFor="d">Question: </label>
        <input value={this.props.question}></input>
      </div>
    )
  }
}

export default TextForm;
