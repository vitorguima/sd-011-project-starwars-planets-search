import React from 'react';
import './App.css';

import PlanetsProvider from './Context/PlanetsProvider';

import PlanetTable from './Components/PlanetTable';

function App() {
  return (
    <PlanetsProvider>
      <PlanetTable />
    </PlanetsProvider>
  );
}

export default App;
