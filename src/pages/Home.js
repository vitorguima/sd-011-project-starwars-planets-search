import React, { useContext, useEffect } from 'react';
import AppContext from '../utils/AppContext';
import Table from '../components/Table';

function Home() {
  const { setPlanets, setFilters, filters } = useContext(AppContext);

  useEffect(() => {
    FetchPlanets().then((data) => setPlanets(data));
  }, [setPlanets]);

  const filterByName = ({ target: { name, value } }) => {
    setFilters({
      filters: {
        ...filters,
        filterByName: { [name]: value },
      },
    });
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        name="name"
        value={ filters.filters.filterByName.name }
        onChange={ filterByName }
      />
      <Table />
    </div>
  );
}

export default Home;
