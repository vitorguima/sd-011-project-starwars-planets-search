import React from 'react';
import './App.css';
import Table from './components/Table';
import AppProvider from './context/ContextProvider';

function App() {
  return (
    <AppProvider>
      <Table />
    </AppProvider>
  );
}

export default App;
