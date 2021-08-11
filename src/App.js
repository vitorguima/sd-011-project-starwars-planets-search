import React from 'react';
import Table from './components/Table';
import NewProvider from './context/MyContext';
import Filters from './components/Filters';
import './App.css';
import NumericFilter from './components/NumericFilter';

// import MyContext from './context/MyContext';

//     ✕ Preencha a tabela com os dados retornados (4546ms)
//     ✕ Verifique se a tabela tem 13 colunas (4514ms)
//     ✕ Verifique se a tabela tem uma linha para cada planeta retornado (4515ms)

function App() {
  return (
    <div>
      <NewProvider>
        <Filters />
        <NumericFilter />
        <Table />
      </NewProvider>
    </div>
  );
}

export default App;
