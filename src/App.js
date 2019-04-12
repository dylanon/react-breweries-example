import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    console.log('constructor was called')
    super(props);
    this.state = {
      breweries: [],
      isLoading: false,
    }
  }

  componentDidMount() {
    console.log('componentDidMount')
    this.setState({
      isLoading: true
    })
    fetch('https://api.openbrewerydb.org/breweries')
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          breweries: data,
          isLoading: false
        });
      })
  }

  render() {
    console.log('render was called');
    const { breweries, isLoading } = this.state;
    return (
      <div className="App">
        <h1>BREWERIES 🍺</h1>
        {isLoading ? (
          <img src={logo} className="App-logo" alt="logo"/>
        ) : (
          <ul>
            {breweries.map(brewery => {
              const { id, name, website_url, city, state } = brewery
              return (
                <li key={id}>
                  <a href={website_url} target="blank">{name}</a>
                  <p>{city}, {state}</p>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
