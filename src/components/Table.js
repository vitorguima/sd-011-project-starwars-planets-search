import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

function Table() {
  const { data } = useContext(GlobalContext);

  if (!data) return <p>Loading...</p>;
  const thNames = Object.keys(data[0]).filter((name) => name !== 'residents');

  return (
    <table>
      <thead>
        <tr>
          {thNames.map((value, index) => (<th key={ index }>{value}</th>))}
        </tr>
      </thead>
      <tbody>
        {data.map((planet, index) => (
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
  );
}

export default Table;
