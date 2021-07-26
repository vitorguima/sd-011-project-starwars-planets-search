import React from 'react';
import './App.css';
import Table from './components/Table';
import StarProvider from './contexts/StarProvider';

function App() {
  return (
    <StarProvider>
      <Table />
    </StarProvider>
  );
}

export default App;
