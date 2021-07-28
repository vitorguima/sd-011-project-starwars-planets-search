import React from 'react';
import './App.css';
import Table from './components/Table';
import MyProvider from './context/MyProvider';
import Filter from './components/Filter';

function App() {
  return (
    <MyProvider>
      <h1>Projeto Star Wars Planets Search</h1>
      <Filter />
      <Table />
    </MyProvider>
  );
}

export default App;
