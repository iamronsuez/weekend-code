import React, { Component } from 'react';
import './App.css';

const Price = ({price}) => <h4>{price}</h4>

const API_ENDPOINT = "https://competent-heyrovsky-d83608.netlify.com/.netlify/functions/price?base=ves&divider=clp"


class App extends Component {

  state = {
    data: {}
  }

  componentDidMount() {
    fetch(API_ENDPOINT).then((response) => response.json())
    .then((data) => {
      this.setState({
        data
      })
    })
    .catch((err) => console.log(err))
  }

  render() {
    const {data} = this.state

    return (
      <div className="App">
        <div className="App-header">
            <Price price={JSON.stringify(data, null, 2)} />
        </div>
      </div>
    );
  }
}

export default App;
