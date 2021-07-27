import React from 'react';
import Provider from './context/Provider';
import Table from './components/Table';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <Provider>
      <main>
        <Header />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
