import React from 'react';
import './App.css';
import Table from './components/Table';
import Order from './components/Order';
import Filters from './components/Filters';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Filters />
      <Order />
      <Table />
    </StarWarsProvider>
  );
}

export default App;

// -----> consulta links abaixo:
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// https://www.youtube.com/watch?v=Rv2eJK1iOTo
