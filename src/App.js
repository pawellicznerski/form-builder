import React, { Component } from 'react';
import Main from './components/main';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Form builder
          <Main></Main>
        </header>
      </div>
    );
  }
}

export default App;
