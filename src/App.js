import React from 'react';
import './App.css';
import FilterByNumbers from './components/FilterByNumbers';
import SearchInput from './components/SearchInput';
import Table from './components/Table';
import StarWarsProvider from './myContext/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <SearchInput />
      <FilterByNumbers />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
