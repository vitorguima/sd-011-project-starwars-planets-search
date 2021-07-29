import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../utils/AppContext';
import useFilters from '../hooks/useFilters';
import Table from '../components/Table';

function Home() {
  const { setPlanets, setFilters } = useContext(AppContext);
  const [planetList, setFiltersToList] = useFilters();

  useEffect(() => {
    setPlanets(planetList);
  }, []);

  const setFilter = ({ target: { value } }) => {
    const filters = {
      filters: {
        filterByName: {
          name: value,
        },
      },
    };
    setFilters(filters);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtro por nome"
        onChange={ setFilter }
      />
      <Table />
    </div>
  );
}

export default Home;
