import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function Filters() {
  const {
    setName,
    data,
    setFilteredData,
    filters: { filterByName },
  } = useContext(StarWarsContext);

  useEffect(() => {
    setFilteredData(
      data.filter((e) => e.name.toLowerCase().includes(filterByName.name)),
    );
  }, [data, filterByName, setFilteredData]);

  return (
    <div>
      <label htmlFor="filterByName">
        Filtrar por Nome:
        <input
          type="text"
          id="filterByName"
          data-testid="name-filter"
          onChange={ (e) => setName({ name: e.target.value }) }
        />
      </label>
    </div>
  );
}

export default Filters;
