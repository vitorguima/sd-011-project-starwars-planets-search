import React from 'react';
import './App.css';
import { GlobalProvider } from './context/GlobalContext';
import Table from './Table';

function App() {
  return (
    <GlobalProvider>
      <Table />
    </GlobalProvider>
  );
}

export default App;
