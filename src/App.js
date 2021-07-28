import React from 'react';
import Forms from './components/Forms';
import Table from './components/Table';
import MyProvider from './context/MyProvider';

function App() {
  return (
    <MyProvider>
      <Forms />
      <Table />
    </MyProvider>
  );
}

export default App;
