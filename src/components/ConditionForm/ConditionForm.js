import React, {Component} from 'react';
import classNames from 'classnames/bind';
import ConditionFormValue from './__conditionForm_value/__conditionForm_value.js';
import ConditionFormOption from './__conditionForm_option/__conditionForm_option.js';


class ConditionForm extends Component{

  render(){
    const {conditionType, id, conditionValue,conditionOption,showDatalist} = this.props.conditions;
    if(conditionType){
      return(
        <div className="select">
        <label htmlFor={this.props.id}>Condition</label>
          <ConditionFormOption
            conditionType={conditionType}
            conditionValue={conditionValue}
            conditionOption={conditionOption}
            id={id}
            showDatalist={showDatalist}

            handleMouseDown={this.props.handleMouseDown.bind(this)}
            />
          <ConditionFormValue
            conditionType={conditionType}
            conditionValue={conditionValue}
            conditionOption={conditionOption}
            id={id}
            showDatalist={showDatalist}

            handleMouseDown={this.props.handleMouseDown.bind(this)}
            />
        </div>
      )
    } else{return null;}

  }
}

export default ConditionForm;
