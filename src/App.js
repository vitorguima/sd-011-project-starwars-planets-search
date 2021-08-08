import React from 'react';
import './App.css';
import Table from './components/Table';
import PlanetsFilter from './components/PlanetsFilter';
import MainProvider from './context/MainProvider';

function App() {
  return (
    <MainProvider>
      <PlanetsFilter />
      <Table />
    </MainProvider>
  );
}

export default App;
