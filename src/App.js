import React from 'react';
import './App.css';
import Home from './components/Home';
import { Provider } from './context/Planet';

function App() {
  return (
    <>
      <h1>Projeto Star Wars</h1>
      <Provider>
        <Home />
      </Provider>
    </>
  );
}

export default App;
