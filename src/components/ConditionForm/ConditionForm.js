import React, {Component} from 'react';
import classNames from 'classnames/bind';
import ConditionFormValue from './__conditionForm_value/__conditionForm_value.js';
import ConditionFormOption from './__conditionForm_option/__conditionForm_option.js';


class ConditionForm extends Component{
  constructor(props){
    super(props);
    this.state={
      conditionType:this.props.conditions.conditionType,
      conditionValue:this.props.conditions.conditionValue,
      conditionOption:this.props.conditions.conditionOption
    }
  }

  handleMouseDown(item,optionStateName){
    console.log('optionStateName---',optionStateName,'what-------',item);
    this.setState({
      [optionStateName]:item
    })
  }


  render(){
    // console.log(' this.props.conditionType',  this.props.conditionType);
    const {conditionType, conditionValue,conditionOption,showDatalist} = this.props.conditions;
    if(conditionType){
      // console.log('conditionType',conditionType);
      return(
        <div className="select">
        <label htmlFor={this.props.id}>Condition</label>
          <ConditionFormOption
            conditionType={conditionType}
            conditionValue={conditionValue}
            conditionOption={conditionOption}
            showDatalist={showDatalist}

            handleMouseDown={this.props.handleMouseDown.bind(this)}
            />
          <ConditionFormValue
            conditionType={conditionType}
            conditionValue={conditionValue}
            conditionOption={conditionOption}
            showDatalist={showDatalist}

            handleMouseDown={this.handleMouseDown.bind(this)}
            />
        </div>
      )
    } else{return null;}

  }
}

export default ConditionForm;
