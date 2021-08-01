import React from 'react';
import './App.css';
import SearchByDetails from './Components/SearchByDetails';
import SearchPlanet from './Components/SearchPlanet';
import Table from './Components/Table';
import APIProvider from './Context/APIProvider';

function App() {
  return (
    <div>
      <APIProvider>
        <h1 className="hello">Hello, Traveller!</h1>
        <SearchPlanet />
        <SearchByDetails />
        <Table />
      </APIProvider>
    </div>
  );
}

export default App;
