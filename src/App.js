import React from 'react';
import StarWarsProvider from './components/Provider';

import Table from './components/Table';

function App() {
  return (
    <StarWarsProvider>
      <span>Hello, App!</span>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
