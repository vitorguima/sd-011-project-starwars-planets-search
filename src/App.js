import React from 'react';
import Table from './Components/Table';
import AppProvider from './ContextAPI_Configs/AppProvider';
import './App.css';

function App() {
  return (
    <AppProvider>
      <span>Hello, App!</span>
      <Table />
    </AppProvider>
  );
}

export default App;
