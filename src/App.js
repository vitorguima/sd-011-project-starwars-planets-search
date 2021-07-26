import React from 'react';
import './App.css';
import MyProvider from './context/MyProvider';
import Table from './Table';
import SearchText from './SearchText';

function App() {
  return (
    <MyProvider>
      <SearchText />
      <Table />
    </MyProvider>
  );
}

export default App;
