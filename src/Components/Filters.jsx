import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function Filters() {
  const {
    setName,
    data,
    setFilteredData,
    filters: { filterByName },
    handleFilterByNumbers,
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
      <label htmlFor="filterByCategory">
        Filtrar por Categoria:
        <select data-testid="column-filter" id="filterByCategory">
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <select data-testid="comparison-filter" id="comparisonField">
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input type="number" data-testid="value-filter" id="valueField" />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilterByNumbers() }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filters;
