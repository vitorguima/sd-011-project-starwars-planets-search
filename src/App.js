import React from 'react';
import DataProvider from './context/DataProvider';
import ListPlanets from './components/ListPlanets';
import './App.css';

function App() {
  return (
    <DataProvider>
      <ListPlanets />
    </DataProvider>

  );
}

export default App;
