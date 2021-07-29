import React from 'react';
import DataProvider from './context/DataProvider';
import Load from './components/Load';
import './App.css';

function App() {
  return (
    <DataProvider>
      <Load />
    </DataProvider>

  );
}

export default App;
