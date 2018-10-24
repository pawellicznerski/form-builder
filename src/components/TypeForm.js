import React, {Component} from 'react';
import classNames from 'classnames/bind';
import SelectTemplate from './ConditionForm/selectTemplate';



class TypeForm extends Component{
  constructor(props){
    super(props);
    this.state={
      showDatalist:false,
      type:this.props.type
    }
  }
  handleOnClick(){

    this.setState({
      showDatalist:!this.state.showDatalist
    })

  }

  handleOnBlur(){
  }



  handleMouseDown(item,optionStateName){
    console.log("item,optionStateName",item,optionStateName);
    this.setState({
      showDatalist:false,
      [optionStateName]:item
    })
    this.props.handleMouseDown(item,optionStateName)
  }

    renderTemplate(selectOptions){

      return <SelectTemplate
                handleOnBlur={this.handleOnBlur.bind(this)}
                handleMouseDown={this.handleMouseDown.bind(this)}
                handleOnClick={this.handleOnClick.bind(this)}
                showDatalist={this.state.showDatalist}

                selectOptions={selectOptions}
                optionStateName={'type'}
                currentValue={this.props.type}
        />
    }

  render(){
    const type = this.props.type?this.props.type:"text";
    const selectOptions= ['text', 'number', 'radio'];
    return(this.renderTemplate(selectOptions))
  }
}

export default TypeForm;
