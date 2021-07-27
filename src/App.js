import React from 'react';
import './App.css';
import Table from './component/Table';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <span>StarWars Planets</span>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
