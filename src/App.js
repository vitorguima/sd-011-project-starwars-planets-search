import React from 'react';
import './App.css';
import MyProvider from './context/MyProvider';
import Table from './Table';

function App() {
  return (
    <MyProvider>
      <Table />
      <span>Hello, App!</span>
    </MyProvider>
  );
}

export default App;
