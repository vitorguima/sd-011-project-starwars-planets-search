import React from 'react';
import Table from './Components/Table';
import AppProvider from './ContextAPI_Configs/AppProvider';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Table />
    </AppProvider>
  );
}

export default App;
