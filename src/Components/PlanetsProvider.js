import React, { useEffect, useState } from 'react';
import Table from './Table';
import { useAuth } from '../Providers/Auth';

function PlanetsProvider() {
  const [data, setData] = useState([]);
  const { filters, setFilters } = useAuth();

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then((json) => setData(json.results));
  }, []);

  function filteredData(rows) {
    const { filterByName: { name } } = filters;
    const minusOne = -1;
    return rows.filter((row) => (
      row.name.toLowerCase().indexOf(name.toLowerCase()) > minusOne
    ));
  }

  return (
    <div>
      <label htmlFor="name-filter">
        Pesquisar Planeta:
        <input
          type="text"
          id="name-filter"
          data-testid="name-filter"
          onChange={ (e) => setFilters({
            filterByName: {
              name: e.target.value,
            },
          }) }
        />
      </label>
      <Table dataForTable={ filteredData(data) } />
    </div>
  );
}

export default PlanetsProvider;
