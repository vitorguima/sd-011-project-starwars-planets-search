import React, { useState, useEffect } from 'react';
import { useAuth } from '../providers/auth';

/**
 * Consultei o video do canal "devmentorlive" para refatorar meu codigo.
 * Link: https://www.youtube.com/watch?v=d1r0aK5awWk
 */

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

  function search(rows) {
    const minusOne = -1;
    return rows.filter((row) => row.name.toLowerCase().indexOf(name) > minusOne);
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
      <div>
        <Datatable data={ search(data) } />
      </div>
    </div>
  );
}

export default Table;
