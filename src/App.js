import React from 'react';
import './App.css';
import Table from './components/Table';
import ContextProvider from './context/ContextProvider';

function App() {
  return (
    <ContextProvider>
      <h1>Star Wars Planet Searcher</h1>
      <Table />
    </ContextProvider>
  );
}

export default App;
