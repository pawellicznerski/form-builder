import React, {Component} from 'react';
import classNames from 'classnames/bind';
import SelectTemplate from './../selectTemplate';



export default class ConditionFormOption extends Component{
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

  renderOptions(conditionType, conditionValue){
    console.log('conditionType',conditionType);
    if(conditionType=='number'){
      const selectOptions= ['Equals', 'Grater', 'Lower'];
     return(this.renderTemplate(selectOptions,'conditionOption') );
    } else{
      const selectOptions= ['Equals', 'Unequals'];
      return(this.renderTemplate(selectOptions,'conditionOption'));
    }
  }


  renderTemplate(selectOptions,optionStateName){
    // console.log("działaaaaaaaaaaaaaaa");

    // const props = [this.state.showDatalist,selectOptions,currentOption];
    return <SelectTemplate
              handleOnBlur={this.handleOnBlur.bind(this)}
              handleMouseDown={this.handleMouseDown.bind(this)}
              handleOnClick={this.handleOnClick.bind(this)}
              showDatalist={this.state.showDatalist}

              selectOptions={selectOptions}
              optionStateName={optionStateName}
              currentValue={this.props.conditionOption}
      />
  }





  render(){
    const {conditionType, conditionValue} = this.props;

    return(<div>
      {this.renderOptions(conditionType, conditionValue)}
      </div>
    )
  }
}

// export default ConditionFormOption;
