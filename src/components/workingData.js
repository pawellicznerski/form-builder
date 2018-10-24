recursiveAction1(id, data) {
  // console.log("data",data);
  for(let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        // console.log("found...", data[i].id);
        return [...data.slice(0,i),...data.slice(i + 1)]
      }else if (data[i].subform && data[i].subform.length) {
        const result =  this.recursiveAction(id,data[i].subform);
        if(result){data[i].subform=result; return data;}
      }
    // return data;
  }
}

recursiveAction2(id, data, newData) {
  for(let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        data[i].subform.push(newData);
        return [...data];
      }else if (data[i].subform && data[i].subform.length) {
        const result =  this.recursiveAction2(id,data[i].subform,newData);
        if(result){data[i].subform=result; return data;}
      }
  }
}

recursiveAction3(id, data, newData) {
  // console.log("data",data);
  for(let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        // console.log("found...", data[i].id);
        return [...data.slice(0,i),newData,...data.slice(i + 1)]
      }else if (data[i].subform && data[i].subform.length) {
        const result =  this.recursiveAction3(id,data[i].subform);
        if(result){data[i].subform=result; return data;}
      }
    // return data;
  }
}


    const oidjow=  return(
        <select
          id={this.props.id}
          onChange={this.props.handleChange.bind(this)}
          name="conditionType"
        >
          <option value="Equals">Equals</option>
          <option value="Unequals">Unequals</option>
        </select>
      )


    const oidjow=
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
