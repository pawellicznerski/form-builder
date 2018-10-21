import React, {Component} from 'react';

class ConditionForm extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  renderOptions(){
    if(this.props.fatherType==='number'){
      return(
        <select id="d">
          <option value="Equals">Equals</option>
          <option value="Grater">Grater than</option>
          <option value="Lower">Lower than</option>
        </select>
      )
    } else{
      return(
        <select id="d">
          <option value="Equals">Equals</option>
          <option value="Unequals">Unequals</option>
        </select>
      )
    }
  }

  renderFatherValue(){
    if(this.props.fatherType==='radio'){
      return(
        <select id="d">
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>
      )
    } else{
      return(<div>
        <input value={this.props.value}/>
        </div>
      )
    }
  }

  render(){
    console.log('ijiojwed', this.props.value);
    if(this.props.fatherType){
      return(
        <div>
        <label htmlFor="d">Condition</label>
          {this.renderOptions()}
          {this.renderFatherValue()}
        </div>
      )
    } else{return null;}

  }
}

export default ConditionForm;
