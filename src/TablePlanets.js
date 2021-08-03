import React from 'react';
import Context from './context/Context';

function TablePlanets() {
  const { data, filteredPlanets } = React.useContext(Context);

  if (data.length === 0) return <h1>Carregando...</h1>;
  if (filteredPlanets.length === 0) return <h1>Planeta não encontrado!</h1>;

  return (
    <div>
      <span>TablePlanets</span>
      <table>
        <thead>
          <tr>
            {Object.keys(data[0])
              .filter((th) => th !== 'residents')
              .map((planets, index) => (<th key={ index }>{planets}</th>))}
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
    </div>);
}

export default TablePlanets;
