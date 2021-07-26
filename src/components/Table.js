import React, { useContext } from 'react';
import PlanetsContext from '../context/Context';

function Table() {
  const { planetsSortedList } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Periodo de Rotação</th>
          <th>Periodo de Órbita</th>
          <th>Diâmetro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Solo</th>
          <th>Água Navegável</th>
          <th>População</th>
          <th>Filmes Onde Aparece</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          planetsSortedList.map((planet) => (
            <tr key={ planet.name }>
              <td data-testid="planet-name">{planet.name}</td>
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
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
