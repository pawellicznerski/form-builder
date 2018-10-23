import React, {Component} from 'react';
import classNames from 'classnames/bind';


class ConditionForm extends Component{
  constructor(props){
    super(props);
    this.state={
      showDatalist:false,
      condition:'Equals'
    }
  }
  // handleClick(){
  //   this.setState({
  //     showDatalist:true
  //   })
  // }
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

  // handleOnFocus(){
  //   this.setState({
  //     showDatalist:true
  //   })
  // }

  handleMouseDown(item){
    this.setState({
      showDatalist:false,
      condition:item
    })
  }

  djeoidje(selectOptions){
  const template =<div>
    <div
      className="select_chosen"
      onClick={this.handleOnClick.bind(this)}
      onBlur={this.handleOnBlur.bind(this)}>
      {this.state.condition}&#8681;
    </div>
    <ul
      className={classNames({
        'select__datalist':true,
        'select__datalist_show':this.state.showDatalist,
      })}>
      {
        selectOptions.map((item, index)=>{ return (
          <li
            className={classNames({
              'select__datalist__item':true,
            })}
            key={index}

            onMouseDown={()=>this.handleMouseDown(item)}>
            {item}
          </li>)
        })
      }
    </ul>
  </div>;

    return template;
  }



  renderOptions(conditionType, conditionValue){
    if(conditionType==='number'){
      const selectOptions= ['Equals', 'Grater', 'Lower'];

      // return(
      //   <select
      //     id={this.props.id}
      //     onChange={this.props.handleChange.bind(this)}
      //     name="conditionType"
      //   >
      //     <option value="Equals">Equals</option>
      //     <option value="Grater">Grater than</option>
      //     <option value="Lower">Lower than</option>
      //   </select>
      // )
      return(
        this.djeoidje(selectOptions)
      )
    } else{
      const selectOptions= ['Equals', 'Unequals'];

      // return(
      //   <select
      //     id={this.props.id}
      //     onChange={this.props.handleChange.bind(this)}
      //     name="conditionType"
      //   >
      //     <option value="Equals">Equals</option>
      //     <option value="Unequals">Unequals</option>
      //   </select>
      // )
      return(
        this.djeoidje(selectOptions)
      )
    }
  }

  renderFatherValue(conditionType, conditionValue){
    if(conditionType==='radio'){
      const selectOptions= ['yes', 'no'];

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
      // return(
      //   this.djeoidje(selectOptions)
      // )
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
