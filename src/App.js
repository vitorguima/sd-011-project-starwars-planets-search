import React from 'react';
import Planets from './components/Planets';
import Head from './components/Head';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Head />
      <Planets />
    </PlanetsProvider>
  );
}

export default App;
