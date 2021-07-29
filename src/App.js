import React, { useState } from 'react';
import './App.css';
import Table from './components/Table';
import planetListContext from './planetListContext';

function App() {
  const InicilaFilterByNumericValues = { column: '', comparison: '', value: 1 };
  const [data, setData] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [arrayDeFiltrosDeNumeros, setArrayDeFiltrosDeNumeros] = useState([]);

  const [filterByNumericValues,
    setFilterByNumericValues] = useState(InicilaFilterByNumericValues);

  return (
    <div>
      <planetListContext.Provider
        value={ { data,
          setData,
          nameFilter,
          setNameFilter,
          filterByNumericValues,
          setFilterByNumericValues,
          arrayDeFiltrosDeNumeros,
          setArrayDeFiltrosDeNumeros,
        } }
      >
        <Table />
      </planetListContext.Provider>
    </div>
  );
}

export default App;
