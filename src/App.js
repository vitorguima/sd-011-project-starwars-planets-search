import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';
import FilterNAme from './components/FilterName';
import Selectors from './components/Selectors';

function App() {
  return (
    <StarWarsProvider>
      <span className="title">🪐Star Wars Planets🪐</span>
      <FilterNAme />
      <Selectors />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
