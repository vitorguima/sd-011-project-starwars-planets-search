import React, { useEffect, useContext } from 'react';
import './App.css';
import Table from './components/Table';
import Context from './context/Context';

function App() {
  const { fetchPlanets } = useContext(Context);

  useEffect(() => {
    fetchPlanets();
  }, []);

  return (
    <div>
      <Table />
    </div>
  );
}

export default App;
