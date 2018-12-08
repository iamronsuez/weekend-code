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

const Form = () => {
  return (
    <form name="contact" method="POST">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div>
      <input type="hidden" name="form-name" value="contact" />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
            <Form />
        </div>
      </div>
    );
  }
}

export default App;
