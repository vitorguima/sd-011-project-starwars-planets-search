import React from 'react';
import './App.css';
import GlobalContext from './Services/Context/GlobalContext';
import Table from './Components/Table';

function App() {
  return (
    <GlobalContext>
      <Table />
    </GlobalContext>
  );
}

export default App;
