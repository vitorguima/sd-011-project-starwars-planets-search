import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
import Header from './components/Header';
import './App.css';
import FiltersList from './components/FiltersList';

function App() {
  return (
    <Provider>
      <main>
        <Header />
        <FiltersList />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
