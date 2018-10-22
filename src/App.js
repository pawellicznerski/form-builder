import React, { Component } from 'react';
import Main from './components/main';
import FormBuilder from './components/FormBuilder';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Form builder
          <FormBuilder/>
        </header>
      </div>
    );
  }
}

export default App;
