import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function Table() {
  const { data } = useContext(GlobalContext);
  const [search, setSearch] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  function changeState({ target: { value } }) {
    setSearch({
      ...search,
      filters: {
        filterByName: {
          name: value,
        },
      },
    });
  }

  if (!data) return <p>Loading...</p>;
  const thNames = Object.keys(data[0]).filter((name) => name !== 'residents');
  const filteredPlanets = data
    .filter((planet) => planet.name.includes(search.filters.filterByName.name));

  return (
    <div>
      <label htmlFor="input">
        <input data-testid="name-filter" id="input" onChange={ changeState } />
      </label>

      <table>
        <thead>
          <tr>
            {thNames.map((value, index) => (
              <th key={ index }>{value}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet, index) => (
            <tr key={ index }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
