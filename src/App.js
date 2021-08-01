import React from 'react';
import './App.css';
import Main from './pages/Main';
import PlanetsProvider from './providers/PlanetProvider';

function App() {
  return (
    <PlanetsProvider>
      <Main />
    </PlanetsProvider>
  );
}

export default App;
