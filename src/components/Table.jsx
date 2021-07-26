import React from 'react';
import Context from '../Context/Context';

function Table() {
  const resultsApi = React.useContext(Context);
  const [filters, setFilters] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  console.log(resultsApi);

  if (!resultsApi) {
    return (
      <p>carregando</p>
    );
  }

  const filterTR = Object.keys(resultsApi.results[0])
    .filter((value) => value !== 'residents');

  function handlerClick({ target }) {
    const { value } = target;
    setFilters({
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  }

  const filterInput = resultsApi.results
    .filter((value) => value.name.includes(filters.filters.filterByName.name));

  return (
    <div>
      <label htmlFor="filter">
        planeta:
        <input
          data-testid="name-filter"
          name="filter"
          type="text"
          onChange={ (value) => handlerClick(value) }
        />
      </label>
      <label htmlFor="selectColum">
        <select
          name="selectColum"
          data-testid="comparison-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <table>
        <thead>
          <tr>
            {filterTR.map((item, index) => (<th key={ index }>{item}</th>))}
          </tr>
        </thead>
        <tbody>
          {filterInput.map((item, index) => (
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
