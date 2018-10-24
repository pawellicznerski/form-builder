import React, {Component} from 'react';
import classNames from 'classnames/bind';
import SelectTemplate from './../selectTemplate';

export default class ConditionFormValue extends Component{
  constructor(props){
    super(props);
    this.state={
      showDatalist:false,
    }
  }

    handleOnClick(){
      this.setState({
        showDatalist:!this.state.showDatalist
      })
    }

    handleOnBlur(){
      this.setState({
        showDatalist:false
      })
    }

    handleMouseDown(item,currentOption){
      this.setState({
        showDatalist:false,
        conditionValue:item
      })
      this.props.handleMouseDown(item,currentOption)
    }


  renderValue(conditionType, conditionValue){
    if(conditionType==='radio'){
      const selectOptions= ['yes', 'no'];
      return( this.renderTemplate(selectOptions,'conditionValue') )
    } else {
      return(<div>
        <input
          name="conditionValue"
          defaultValue={conditionValue}
          id={this.props.id}
          type={`${conditionType}`}
          />
        </div>
      )
    }
  }

  renderTemplate(selectOptions,optionStateName){
    return <SelectTemplate

              handleOnBlur={this.handleOnBlur.bind(this)}
              handleMouseDown={this.handleMouseDown.bind(this)}
              handleOnClick={this.handleOnClick.bind(this)}
              showDatalist={this.state.showDatalist}

              selectOptions={selectOptions}
              optionStateName={optionStateName}
              currentValue={this.props.conditionValue}
      />
  }

  render(){
    const {conditionType, conditionValue} = this.props;

    return(<div>
      {this.renderValue(conditionType, conditionValue)}
      </div>
    )
  }
}

// export default ConditionFormValue;
