import React from 'react';
import './App.css';
import SearchPlanet from './Components/SearchPlanet';
import Table from './Components/Table';
import APIProvider from './Context/APIProvider';

function App() {
  return (
    <div>
      <APIProvider>
        <h1 className="hello">Hello, Traveller!</h1>
        <SearchPlanet />
        <Table />
      </APIProvider>
    </div>
  );
}

export default App;
