import React from 'react';
import './App.css';
import InputFilter from './InputFilter';
import InputNumber from './InputNumber';
import Provider from './Provider';
import SelectedFilter from './SelectedFilter';
import Table from './Table';

function App() {
  return (
    <Provider>
      <h1> Planets Star Wars </h1>
      <InputFilter />
      <InputNumber />
      <SelectedFilter />
      <Table />
    </Provider>

  );
}

export default App;
