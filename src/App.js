import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsProvider';
import InputFiltraName from './components/InputFiltraName';

function App() {
  return (
    <PlanetsProvider>
      <span>Hello, App!</span>
      <InputFiltraName />
      <Table />
    </PlanetsProvider>
  );
}

export default App;
