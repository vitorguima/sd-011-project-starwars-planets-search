import React from 'react';
import './App.css';
import Provider from './Provider';
import Table from './Table';

function App() {
  return (
    <Provider>
      <h1> Planets Star Wars </h1>
      <Table />
    </Provider>

  );
}

export default App;
