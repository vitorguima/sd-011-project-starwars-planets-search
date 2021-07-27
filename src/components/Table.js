import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/auth';

/**
 * Consultei o video do canal "devmentorlive" para refatorar meu codigo.
 * Link: https://www.youtube.com/watch?v=d1r0aK5awWk
 */

import FilterNumericNumbers from './FilterNumericNumbers';
import Datatable from './datatable';

function Table() {
  const [data, setData] = useState([]);
  const { filters, setFilters } = useAuth();
  const { filterByName: { name } } = filters;

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  const { filterByNumericValues } = filters;

  function search(rows) {
    const minusOne = -1;

    if (filterByNumericValues[0]) {
      const { column, value, comparison } = filterByNumericValues[0];

      // return rows.filter((row) => (
      //   row.name.toLowerCase().indexOf(name) > minusOne
      //   && parseInt(row[column], 0) > parseInt(value, 0)
      // ));

      switch (comparison) {
      case 'maior que':
        return rows.filter((row) => (
          row.name.toLowerCase().indexOf(name) > minusOne
            && parseInt(row[column], 0) > parseInt(value, 0)
        ));
      case 'menor que':
        return rows.filter((row) => (
          row.name.toLowerCase().indexOf(name) > minusOne
            && parseInt(row[column], 0) < parseInt(value, 0)
        ));
      case 'igual a':
        return rows.filter((row) => (
          row.name.toLowerCase().indexOf(name) > minusOne
            && parseInt(row[column], 0) === parseInt(value, 0)
        ));
      default:
      }
    }

    return rows.filter((row) => (
      row.name.toLowerCase().indexOf(name) > minusOne
    ));
  }

  return (
    <div>
      <input
        type="text"
        value={ name }
        data-testid="name-filter"
        onChange={ (e) => setFilters({
          ...filters,
          filterByName: { name: e.target.value },
        }) }
      />
      <FilterNumericNumbers />
      <div>
        <Datatable data={ search(data) } />
      </div>
    </div>
  );
}

export default Table;
