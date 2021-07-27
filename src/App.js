import React from 'react';
import './App.css';
import Table from './components/Table';
import StarsProvider from './context/StarsProvider';

function App() {
  return (
    <StarsProvider>
      <Table />
    </StarsProvider>
  );
}

export default App;
