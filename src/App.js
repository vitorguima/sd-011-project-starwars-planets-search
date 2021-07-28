import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Table from './components/Table';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Provider>
      <SearchBar />
      <Table />
    </Provider>

  );
}

export default App;
