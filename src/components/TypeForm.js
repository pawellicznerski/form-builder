import React, {Component} from 'react';

class SelectForm extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  render(){
    const type = this.props.type?this.props.type:"text";
    return(
      <div>
       <label htmlFor="d">Type: </label>
        <select id="d" default={type}>
          <option
            value="text"
            selected={type==="text"?true:false}
            >text</option>
          <option
            value="number"
            selected={type==="number"?true:false}
            >number</option>
          <option
            value="radio"
            selected={type==="radio"?true:false}
            >yes/no</option>
        </select>
      </div>
    )
  }
}

export default SelectForm;
