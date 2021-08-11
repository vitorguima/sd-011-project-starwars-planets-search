import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Table from './components/Table';
import NumericFilter from './components/filters/NumericFilter';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <SearchBar />
      <NumericFilter />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
