import React from 'react';
import './App.css';
import Table from './components/Table';
import GlobalContext from './Context/GlobalContext';

function App() {
  return (
    <GlobalContext>
      <Table />
    </GlobalContext>
  );
}

export default App;
