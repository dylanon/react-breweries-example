import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('CONSTRUCTOR() RAN')
    this.state = {
      breweries: [],
      isLoading: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('COMPONENT DID UPDATE')
  }

  componentDidMount() {
    console.log('COMPONENTDIDMOUNT() RAN')
    // FETCH SOME DATA IN HERE
    this.setState({ isLoading : true })
    fetch('https://api.openbrewerydb.org/breweries')
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          breweries: data,
          isLoading: false
        });
      })
  }

  render() {
    console.log('RENDER() RAN')
    return (
      <div className="App">
        <h1>{this.props.title} 🍺</h1>

        {this.state.isLoading ? (
          <img src={logo} className="App-logo" alt="logo"/>
        ) : (
          <ul>
            {this.state.breweries.map(brewery => {
              const { id, name, website_url } = brewery
              return (
                <li key={id}>
                  <a href={website_url}>{name}</a>
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

