import React from 'react';
import './App.css';
import StarWarsProvider from './components/StarWarsProvider';
import Table from './components/Table';

function App() {
  return (
    <StarWarsProvider>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
