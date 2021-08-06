import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

// https://pt.stackoverflow.com/questions/456689/filtro-de-tabela-pelo-nome-em-react

function Filters() {
  const { filter, setFilter } = useContext(MyContext);

  // function searchTable(value) {
  //   const filteredData = [];

  //   if (value.length === 0) {
  //     return filter;
  //   }

  //   for (let i = 0; i < data.length; i += 1) {
  //     const newValue = value.toLowerCase();

  //     const user = data[i].user.toLowerCase();

  //     if (user.includes(newValue)) {
  //       filteredData.push(data[i]);
  //     }
  //   }
  //   return filteredData;
  // }

  return (
    <form>
      <label htmlFor="filterInput">
        <input
          data-testid="name-filter"
          id="filterInput"
          type="text"
          onChange={ (e) => setFilter(e.target.value) }
          value={ filter }
          placeholder="Econtre um planeta"
        />
      </label>
    </form>
  );
}

export default Filters;
