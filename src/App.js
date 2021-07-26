import React, { useContext, useEffect } from 'react';
import './App.css';
import PlanetsContext from './PlanetsContext';
import Table from './Table';

function App() {
  const { fetchData } = useContext(PlanetsContext);

  useEffect(fetchData, []);

  return (
    <Table />
  );
}

export default App;
