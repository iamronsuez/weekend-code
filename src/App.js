import React, { Component } from 'react';
import './App.css';
import ChartBox from './components/Chart'
class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <ChartBox currency='ves-clp'/>
          <ChartBox currency='ves-usd'/>
        </div>
      </div>
    );
  }
}

export default App;
