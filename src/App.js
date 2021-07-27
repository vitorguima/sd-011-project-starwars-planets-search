import React from 'react';
import './App.css';

import Provider from './context/PlanetsProvider';

import Home from './pages/Home';

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;
