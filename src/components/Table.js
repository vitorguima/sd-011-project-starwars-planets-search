import React, { useContext } from 'react';
import Context from '../context/Context';

export default function Table() {
  const { data } = useContext(Context);
  if (!data[0]) {
    return (<p>Carregando...</p>);
  }
  const filteredValues = Object.keys(data[0]).filter((value) => value !== 'residents');
  const filteredPlanets = data;
  return (
    <div>
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
