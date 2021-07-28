import React from 'react';
import './App.css';
import Table from './Components/Table';
import APIProvider from './Context/APIProvider';

function App() {
  return (
    <div>
      <APIProvider>
        <span>Hello, Traveller!</span>
        <Table />
      </APIProvider>
    </div>
  );
}

export default App;
