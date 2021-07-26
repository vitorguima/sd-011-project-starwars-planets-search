import React, { useContext } from 'react';
import './App.css';
import PlanetContext from './context/PlanetContex';
import Header from './Header';
import Table from './Table';

function App() {
  return (
    <div>
      <Header />
      <Table />
    </div>
  );
}

export default App;
