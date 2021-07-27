import React from 'react';
import './App.css';
import SWProvider from './context/SWProvider';
import PlanetDisplay from './components/PlanetDisplay';
// import Filter from './components/Filter';

function App() {
  return (
    <SWProvider>
      <div>
        <h1>Star Wars Planets</h1>
        {/* <Filter /> */}
        <PlanetDisplay />
      </div>
    </SWProvider>
  );
}

export default App;
