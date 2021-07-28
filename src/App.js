import React from 'react';
import AppProvider from './context/AppProvider';
import ShowTable from './components/Table';
import './App.css';

function App() {
  return (
    <>
      <h1
        style={ { textAlign: 'center', color: 'blue' } }
      >
        Welcome the planets star wars!
      </h1>
      <AppProvider>
        <ShowTable />
      </AppProvider>
    </>
  );
}

export default App;
