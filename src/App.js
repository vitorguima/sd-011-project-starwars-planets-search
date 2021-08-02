import React from 'react';
import PlanetProvider from './context/PlanetProvider';
import Table from './components/Table';
import Form from './components/Form';
import './App.css';

function App() {
  return (
    <PlanetProvider>
      <Table />
      <Form />
    </PlanetProvider>
  );
}

export default App;
