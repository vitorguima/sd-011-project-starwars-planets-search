import React from 'react';
import './App.css';
import NameFilter from './components/NameFilter';
import NumericFilter from './components/NumericFilter';
import Table from './components/Table';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <h1>Star Wars Planet Searcher</h1>
      <NameFilter />
      <NumericFilter />
      <Table />
    </ContextProvider>
  );
}

export default App;
