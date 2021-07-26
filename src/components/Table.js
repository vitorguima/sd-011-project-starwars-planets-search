import React, { useContext, useState } from 'react';
import Context from '../context/Context';

export default function Table() {
  const [filterState, setFilterState] = useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });
  const { data } = useContext(Context);
  if (!data[0]) {
    return (<p>Carregando...</p>);
  }
  const filteredValues = Object.keys(data[0]).filter((value) => value !== 'residents');
  const filteredPlanets = data.filter((planet) => planet.name
    .includes(filterState.filters.filterByName.name));
  // console.log(filteredPlanets);
  return (
    <div>
      <label htmlFor="filterPlanets">
        <input
          id="filterPlanets"
          data-testid="name-filter"
          onChange={ (({ target }) => setFilterState({
            ...filterState,
            filters: {
              filterByName: {
                name: target.value,
              },
            },
          })) }
        />
      </label>
      <table>
        <thead>
          <tr>
            {filteredValues.map((value, index) => (<th key={ index }>{value}</th>))}
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
            </tr>))}
        </tbody>
      </table>
    </div>
  );
}

Table.ThemeContext = Context;
