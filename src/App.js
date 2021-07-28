import React from 'react';
import ProviderPlanets from './context/ProviderPlanets';
import Table from './components/Table';

function App() {
  return (
    <div>
      <ProviderPlanets>
        <Table />
      </ProviderPlanets>
    </div>
  );
}

export default App;
