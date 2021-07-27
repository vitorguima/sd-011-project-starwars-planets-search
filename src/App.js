import React from 'react';
import './App.css';
import SWProvider from './context/SWProvider';
import PlanetDisplay from './components/PlanetDisplay';

function App() {
  return (
    <SWProvider>
      <div>
        <h1>Hello, App!</h1>
        <PlanetDisplay />
      </div>
    </SWProvider>
  );
}

export default App;
