import React from 'react';
import './App.css';
import StarFilter from './components/StarFilter';
import Table from './components/Table';
import StarProvider from './contexts/StarProvider';

function App() {
  return (
    <StarProvider>
      <StarFilter />
      <Table />
    </StarProvider>
  );
}

export default App;
