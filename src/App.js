import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';
import FilterNAme from './components/FilterName';

function App() {
  return (
    <StarWarsProvider>
      <span className="title">🪐Star Wars Planets🪐</span>
      <FilterNAme />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
