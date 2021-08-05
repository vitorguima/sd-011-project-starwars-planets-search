import React from 'react';
import './App.css';
import SortBar from './components/SortBar';
import Provider from './context/Provider';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <SortBar />
      <Table />
    </Provider>
  );
}

export default App;
