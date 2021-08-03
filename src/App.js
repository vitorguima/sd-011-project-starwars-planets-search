import React from 'react';
import './App.css';
import FilterList from './components/FilterList';
import Forms from './components/Forms';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <header>
        <img src="https://seeklogo.com/images/S/star-wars-the-last-jedi-logo-571704734E-seeklogo.com.png" alt="star wars logo" />
      </header>
      <div className="App">
        <Forms />
        <FilterList />
        <Table />
      </div>
    </Provider>
  );
}

export default App;
