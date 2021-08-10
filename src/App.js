import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Provider from './Context/Provider';

class App extends React.Component {
  render() {
    return (
      <Provider>
        <Home />
      </Provider>
    );
  }
}

export default App;
