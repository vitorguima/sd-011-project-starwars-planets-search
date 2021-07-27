import React from 'react';
import './App.css';
import Table from './Components/Table';
import Provider from './Provider';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
