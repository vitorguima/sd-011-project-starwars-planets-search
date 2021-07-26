import React from 'react';
import { GlobalStorage } from './GlobalContext';
import './App.css';

function App() {
  return (
    <GlobalStorage>
      <span>Titulo</span>
    </GlobalStorage>
  );
}

export default App;
