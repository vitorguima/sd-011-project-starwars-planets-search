import React from 'react';
import './App.css';
import InputFilter from './InputFilter';
import Provider from './Provider';
import Table from './Table';

function App() {
  return (
    <Provider>
      <h1> Planets Star Wars </h1>
      <InputFilter />
      <Table />
    </Provider>

  );
}

export default App;
