import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const [filters, setFilters] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    } });

  const data = useContext(PlanetsContext);
  if (!data) {
    return (
      <h1>Loading</h1>
    );
  }
  // get keys & filter residents off
  const objectKeys = Object.keys(data[0]).filter((value) => value !== 'residents');

  const handleSearchInputValue = ({ target }) => {
    const { value } = target;
    setFilters({
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  };

  const filterHandler = data.filter((item) => item.name
    .includes(filters.filters.filterByName.name));
  console.log(filterHandler);

  return (
    <div>
      <label htmlFor="search">
        Search by name:
        {' '}
        <input
          name="search"
          data-testid="name-filter"
          onChange={ (e) => handleSearchInputValue(e) }
        />
      </label>
      <table>
        <thead>
          <tr>
            {objectKeys.map((item, index) => (<th key={ index }>{item}</th>))}
          </tr>
        </thead>
        <tbody>
          {filterHandler.map((item, index) => (
            <tr key={ index }>
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
