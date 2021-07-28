import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, setFilters, filters } = useContext(PlanetsContext);
  const [inputName, setInputName] = useState('');
  const filterData = inputName ? data.filter((planet) => planet
    .name.includes(inputName)) : data;
  return (
    <>
      <form>
        <input
          type="text"
          data-testid="name-filter"
          placeholder="search the name of the planet"
          onChange={ ({ target }) => {
            setInputName(target
              .value); setFilters({ ...filters, filterByName: { name: target.value } });
          } }
        />
      </form>
      <table>
        <caption>Planets</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((planet) => (
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
    </>
  );
}

export default Table;
