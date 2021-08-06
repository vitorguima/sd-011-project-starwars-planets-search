import React from 'react';
import './App.css';
<<<<<<< HEAD
import { Provider } from './context/Provider';
=======
import SortBar from './components/SortBar';
import Provider from './context/Provider';
>>>>>>> parent of 54e056a... fix slint
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <SortBar />
      <Table />
    </Provider>
  );
}

export default App;
