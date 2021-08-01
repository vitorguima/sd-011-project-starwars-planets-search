import React from 'react';

import Table from './components/Table';
import StarwarsProvider from './context/StarWarsProvider';

import './App.css';

function App() {
  return (
    <StarwarsProvider>
      <Table />
    </StarwarsProvider>
  );
}

export default App;
