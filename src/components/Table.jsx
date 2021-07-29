import React, { useContext } from 'react';
import StarsContext from '../context/StarsContext';
import Form from './Form';
import FilteredCategories from './FilteredCategories';

export default function Table() {
  const {
    data,
    filters,
    setFilters,
    setFilteredPlanets,
  } = useContext(StarsContext);

  function handleChange({ target }) {
    const { value } = target;
    const nameSearch = data.filter((search) => search.name.includes(value));
    setFilters({ ...filters, filterByName: { value } });
    setFilteredPlanets(nameSearch);
  }

  return (
    <div>
      <label htmlFor="search">
        Procure alguma informação
        <input
          type="text"
          id="search"
          data-testid="name-filter"
          onChange={ handleChange }
        />
      </label>
      <Form />
      <table>
        <thead>
          <tr>
            {data.length > 0
            && Object.keys(data[0]).map((column, index) => (
              <th key={ index }>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <FilteredCategories />
        </tbody>
      </table>
    </div>
  );
}
