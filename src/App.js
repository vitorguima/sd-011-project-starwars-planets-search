import React, { useState } from 'react';
import ContextPlanetsApi from './context/ContextPlanetsApi';
import Table from './components/Table';

function App() {
  const [planets] = useState([]);
  console.log(planets);
  return (
    <div>
      <ContextPlanetsApi.Provider value={ { planets } }>
        <Table />
      </ContextPlanetsApi.Provider>
    </div>
  );
}

export default App;
