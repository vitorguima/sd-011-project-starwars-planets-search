import React from 'react';
import './App.css';
import StarWarsProvider from './context/StarWarsProvider';
import Table from './components/Table';

function App() {
  return (
    <StarWarsProvider>
      <span className="title">🪐Star Wars Planets🪐</span>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
