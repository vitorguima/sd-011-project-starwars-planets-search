import React from 'react';
import './App.css';
import Table from './components/Table';
import { AppContextProvider } from './contexts/AppContext';

function App() {
  return (
    <div>
      <AppContextProvider>
        <Table />
      </AppContextProvider>
    </div>
  );
}

export default App;
