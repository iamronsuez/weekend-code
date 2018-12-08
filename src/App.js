import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const TodoList = ({children}) => {
  return (
    <ul>
      {children}
    </ul>
  )
}

const TodoItem = ({text, checked}) => {
  return (
    <li>
      <div>
          <span>{text}</span>
          <input type="checkbox" checked={checked}/>
      </div>
    </li>
  )
}


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code>  hola
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React -> llovizna labs
          </a>

          <TodoList>
              <TodoItem text="crear app de react" checked/>
              <TodoItem text="crear repo de github" checked/>
              <TodoItem text="subir repo a netlify"/>
              <TodoItem text="subir un cambio al repo y ver update en netlify"/>
          </TodoList>
        </header>
      </div>
    );
  }
}

export default App;
