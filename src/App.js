import React from 'react';
import './App.css';
import Table from './components/Table';
import Greetings from './components/Greetings';
import PlanetsProvider from './context/PlanetsProvider';
import logoLenilsom from './logoLenilsom.png';
import trybe from './trybe.png';

function App() {
  return (
    <PlanetsProvider>
      <div>
        <div className="header-app">
          <img src={ logoLenilsom } alt="Logo-lenilsom" className="logo-lenilsom" />
          <h1>Projeto StarWars</h1>
          <img src={ trybe } alt="logo-trybe" className="logo-trybe" />
        </div>
        <Greetings />
        <Table />
      </div>
    </PlanetsProvider>
  );
}

export default App;
