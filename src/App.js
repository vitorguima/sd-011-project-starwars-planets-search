import React from 'react';
import './App.css';

import PlaneProvider from './context/planetProvider';

import Table from './components/Table';

function App() {
  return (
    <PlaneProvider>
      <Table />
    </PlaneProvider>
  );
}

export default App;
