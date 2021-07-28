import React, { useContext } from 'react';
import StarsContext from '../context/StarsContext';

export default function Table() {
  const {
    data,
    filters,
    filteredPlanets,
    setFilters,
    setFilteredPlanets,
  } = useContext(StarsContext);

  function handleChange({ target }) {
    const { value } = target;
    const nameSearch = data.filter((search) => search.name.includes(value));
    setFilters({ ...filters, filterByName: { value } });
    setFilteredPlanets(nameSearch);
  }

  function inputSearch() {
    return filteredPlanets.map((planet, index) => (
      <tr key={ index }>
        {Object.values(planet).map((info) => (
          <td key={ info.name }>
            {info}
          </td>
        ))}
      </tr>
    ));
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
          {inputSearch()}
        </tbody>
      </table>
    </div>
  );
}
