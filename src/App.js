import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <MyProvider>
      <Header />
      <Table />
    </MyProvider>
  );
}

export default App;
