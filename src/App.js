import React from 'react';
import './App.css';
import Table from './componentes/Table';
import StarProvider from './context/StarProvider';

function App() {
  return (
    <StarProvider>
      Hello! App!
      <Table />
    </StarProvider>
  );
}

export default App;
