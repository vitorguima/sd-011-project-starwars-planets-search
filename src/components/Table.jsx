import React, { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export default function Table() {
  const { data } = useContext(AppContext);
  const StarWarsPlanets = data.results;

  const [filters, setFilters] = React.useState({
    filters: {
      filterByName: {
        name: '',
      },
    },
  });

  if (!StarWarsPlanets) {
    return (
      <p>Carregando...</p>
    );
  }

  const SearchFilter = StarWarsPlanets.filter(
    (Value) => Value.name.includes(filters.filters.filterByName.name),
  );

  return (
    <div>
      <input
        value={ filters.filters.filterByName.name }
        data-testid="name-filter"
        onChange={ ({ target }) => {
          setFilters({
            filters: {
              filterByName: {
                name: target.value,
              } } });
        } }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {SearchFilter.map((planet, index) => (
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
      )
    </div>
  );
}
