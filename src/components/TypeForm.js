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
        <select
          id="d"
          defaultValue={type}
          onChange={this.props.handleChange.bind(this)}
          name='type'  >
          <option
            value="text"
            >text</option>
          <option
            value="number"
            >number</option>
          <option
            value="radio"
            >yes/no</option>
        </select>
      </div>
    )
  }
}

export default SelectForm;
