import React, { useState, useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import FilterSearch from './FilterSearch';

function SearchBar() {
  const [filter, setFilter] = useState({
    filters: {
      filterByName: { search: '' },
      filterByNumericValues: [{ column: '', comparison: '', value: '' }],
    },
  });
  const { dataFromApi, setPlanetsFilter } = useContext(StarWarsContext);
  const { planets } = dataFromApi;
  const { filters: { filterByName: { search } } } = filter;

  const filterPlanets = () => {
    const filterByQuery = new RegExp(`^.*${search}.*`, 'i');

    setPlanetsFilter({
      filteredPlanets: planets.results
        .filter((result) => filterByQuery.test(result.name)),
    });
  };

  useEffect(() => {
    filterPlanets();
  }, [search]);

  const handleChange = ({ target: { name, value } }) => {
    setFilter({
      filters: { ...filter.filters, filterByName: { [name]: value } },
    });
  };

  return (
    <>
      <label htmlFor="search-bar">
        Pesquisar:

        <input
          type="text"
          name="search"
          id="search-bar"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
      <FilterSearch filter={ filter } setFilter={ setFilter } />
    </>
  );
}

export default SearchBar;
