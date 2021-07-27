import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import planetListContext from './planetListContext';

function App() {
  const inicialFilters = { filters: {
    filterByName: {
      name: '',
    },
  },
  };

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(inicialFilters);

  return (
    <div>
      <planetListContext.Provider value={ { data, setData, filter, setFilter } }>
        <Table />
      </planetListContext.Provider>
    </div>
  );
}

export default App;
