import React from 'react';
import Planets from './components/hooks/Planets';
import Head from './components/hooks/Head';
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
