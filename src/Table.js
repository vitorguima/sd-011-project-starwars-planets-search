import React from 'react';
import { GlobalContext } from './GlobalContext';

const Table = () => {
  const apiResults = React.useContext(GlobalContext);

  const [filters, setFilters] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  if (!apiResults.data) {
    return (
      <p>Carregando...</p>
    );
  }

  const filterHeader = Object.keys(apiResults.data.results[0])
    .filter((value) => value !== 'residents');

  const filterSearch = apiResults.data.results
    .filter((value) => value.name.includes(filters.filters.filterByName.name));

  return (
    <div>
      <label htmlFor="name-filter">
        <input
          data-testid="name-filter"
          name="name-filter"
          value={ filters.filters.filterByName.name }
          type="text"
          onChange={ ({ target }) => {
            setFilters({
              filters: {
                filterByName: {
                  name: target.value,
                },
              },
            });
          } }
        />
      </label>
      <table>
        <thead>
          <tr>
            { filterHeader.map((value, index) => <th key={ index }>{value}</th>)}
          </tr>
        </thead>
        <tbody>
          { filterSearch.map((value, index) => (
            <tr key={ index }>
              <td>{value.name}</td>
              <td>{value.rotation_period}</td>
              <td>{value.orbital_period}</td>
              <td>{value.diameter}</td>
              <td>{value.climate}</td>
              <td>{value.gravity}</td>
              <td>{value.terrain}</td>
              <td>{value.surface_water}</td>
              <td>{value.population}</td>
              <td>{value.films}</td>
              <td>{value.created}</td>
              <td>{value.edited}</td>
              <td>{value.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
