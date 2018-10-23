import React, {Component} from 'react';

class ConditionForm extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  renderOptions(conditionType, conditionValue){
    if(conditionType==='number'){
      return(
        <select
          id={this.props.id}
          onChange={this.props.handleChange.bind(this)}
          name="conditionType"
        >
          <option value="Equals">Equals</option>
          <option value="Grater">Grater than</option>
          <option value="Lower">Lower than</option>
        </select>
      )
    } else{
      return(
        <select
          id={this.props.id}
          onChange={this.props.handleChange.bind(this)}
          name="conditionType"
        >
          <option value="Equals">Equals</option>
          <option value="Unequals">Unequals</option>
        </select>
      )
    }
  }

  renderFatherValue(conditionType, conditionValue){
    if(conditionType==='radio'){
      return(
        <select
          onChange={this.props.handleChange.bind(this)}
          name="conditionValue"
          defaultValue={conditionValue}
          id={this.props.id}
        >
          <option value="yes">yes</option>
          <option value="no">no</option>
        </select>
      )
    } else if(conditionType==='number'){
      return(<div>
        <input
          onChange={this.props.handleChange.bind(this)}
          name="conditionValue"
          defaultValue={conditionValue}
          id={this.props.id}
          type='number'
          />
        </div>
      )
    } else {
      return(<div>
        <input
          onChange={this.props.handleChange.bind(this)}
          name="conditionValue"
          defaultValue={conditionValue}
          id={this.props.id}
          />
        </div>
      )
    }
  }

  render(){
    // console.log(' this.props.conditionType',  this.props.conditionType);
    const {conditionType, conditionValue} = this.props
    if(conditionType){
      return(
        <div>
        <label htmlFor={this.props.id}>Condition</label>
          {this.renderOptions(conditionType, conditionValue)}
          {this.renderFatherValue(conditionType, conditionValue)}
        </div>
      )
    } else{return null;}

  }
}

export default ConditionForm;
