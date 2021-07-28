import React from 'react';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';
import Provider from './context/Provider';

function App() {
  return (
  /* REQUESITO 01 INSERINDO PROVIDER  */
  <Provider>
  <span>Hello, App!</span>
  <Filters />
  <Table/>
  </Provider>
  );
}

export default App;
