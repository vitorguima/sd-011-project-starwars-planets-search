import React from 'react';
import TabelaProvider from './provider/TabelaProvider';
import Tabela from './components/Tabela';
import './App.css';

function App() {
  return (
    <TabelaProvider>
      <Tabela />
    </TabelaProvider>
  );
}

export default App;
