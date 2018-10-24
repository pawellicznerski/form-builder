import React, {Component} from 'react';
import classNames from 'classnames/bind';

class SelectTemplate extends Component{
  render(){
    const {selectOptions,optionStateName,currentValue,showDatalist}= this.props;
    return(
      <div >
        <div
          className="select_chosen"
          onClick={this.props.handleOnClick.bind(this)}          onBlur={this.props.handleOnBlur.bind(this)}>
          {currentValue}&#8681;
        </div>
        <ul
          className={classNames({
            'select__datalist':true,
            'select__datalist_show':showDatalist,
          })}>
          {
            selectOptions.map((item, index)=>{ return (
              <li
                className={classNames({
                  'select__datalist__item':true,
                })}
                key={index}
                onMouseDown={()=>this.props.handleMouseDown(item,optionStateName)}>
                {item}
              </li>)
            })
          }
        </ul>
      </div>
    )
  }
}





export default SelectTemplate;
