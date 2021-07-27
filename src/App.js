import React from 'react';
import Provider from './utils/Provider';
import Table from './components/Table';
import Filters from './components/Filters';
import AppliedFilters from './components/AppliedFilters';
import style from './App.module.css';

function App() {
  return (
    <Provider>
      <main className={ style.container }>
        <header className={ style.header }>
          <i className={ `fab fa-jedi-order ${style.icon}` } />
          <h1 className={ style.title }>Starwars Planets</h1>
          <i className={ `fab fa-jedi-order ${style.icon}` } />
        </header>
        <Filters />
        <AppliedFilters />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
