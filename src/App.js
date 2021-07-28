import React from 'react';
import './App.css';
import Table from './components/Table';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <MyProvider>
      <h1>Projeto Star Wars Planets Search</h1>
      <Table />
    </MyProvider>
  );
}

export default App;
