import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import Home from './components/Home';

function App() {
  return (
    <PlanetsProvider>
      <Home />
    </PlanetsProvider>
  );
}

export default App;
