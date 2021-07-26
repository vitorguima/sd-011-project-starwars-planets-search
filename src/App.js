import React from 'react';
import './App.css';
import Provider from './APIcontext/Provider';
import Table from './components/Table';
import NameInput from './components/NameInput';

function App() {
  return (
    <Provider>
      <NameInput />
      <Table />
    </Provider>
  );
}

export default App;
