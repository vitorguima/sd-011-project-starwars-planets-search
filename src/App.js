import React from 'react';
import Table from './Components/Table';
import './App.css';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <Table />
    </Provider>
  );
}

export default App;
