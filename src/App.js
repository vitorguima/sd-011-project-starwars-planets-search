import React from 'react';
import './App.css';
import Table from './components/Table';
import FilteredProvider from './context/FilteredProvider';

function App() {
  return (
    <main>
      <FilteredProvider>
        <Table />
      </FilteredProvider>
    </main>
  );
}

export default App;
