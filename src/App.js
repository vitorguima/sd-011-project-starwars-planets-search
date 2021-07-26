import React from 'react';
import './App.css';
import GlobalContext from './context/GlobalContext';
import Table from './components/Table';

function App() {
  return (
    <GlobalContext>
      <Table />
    </GlobalContext>
  );
}

export default App;
