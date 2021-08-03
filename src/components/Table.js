import React, { useContext } from 'react';
import PlanetContext from '../context/PlanetContext';
import FilterNumber from './FilterNumber';

function Table() {
  const { data, filterPlanets, setFilter, filters } = useContext(PlanetContext);

  function handleChange(event) {
    const { value } = event.target;
    setFilter({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  }

  const filterMap = filterPlanets.length <= 0 ? data : filterPlanets;

  return (
    <main>
      <form>
        <label htmlFor="inputName">
          Digite o Nome de um Planeta
          <input
            id="inputName"
            data-testid="name-filter"
            onChange={ handleChange }
          />
        </label>
      </form>
      <FilterNumber />
      <table border={ 1 }>
        <thead>
          <tr>
            <th>Name</th>
            <th>Período de Rotação</th>
            <th>Período Orbital</th>
            <th>Diametro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água na Superfície</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criado</th>
            <th>Editado</th>
            <th>url</th>
          </tr>
        </thead>
        <tbody>
          {filterMap.map((planet) => (
            <tr key={ planet.name }>
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
    </main>
  );
}

export default Table;
