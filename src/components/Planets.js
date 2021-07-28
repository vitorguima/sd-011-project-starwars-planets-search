import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Planets() {
  const {
    filterPlanet,
    err,
  } = useContext(PlanetsContext);

  console.log('filterPlanet no Planet', filterPlanet);

  const table = () => {
    const renderOnScreen = (
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Periodo de rotação</th>
            <th>Periodo orbitação</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água na superfície</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criado</th>
            <th>Editado</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filterPlanet.map((e, i) => {
              const lines = (
                <tr key={ i }>
                  <td>{e.name}</td>
                  <td>{e.rotation_period}</td>
                  <td>{e.orbital_period}</td>
                  <td>{e.diameter}</td>
                  <td>{e.climate}</td>
                  <td>{e.gravity}</td>
                  <td>{e.terrain}</td>
                  <td>{e.surface_water}</td>
                  <td>{e.population}</td>
                  <td>{e.films}</td>
                  <td>{e.created}</td>
                  <td>{e.edited}</td>
                  <td>{e.url}</td>
                </tr>);
              return lines;
            })
          }
        </tbody>
      </table>
    );
    if (err === undefined) {
      return renderOnScreen;
    }
    return (
      <div>
        { err }
      </div>
    );
  };

  return (
    table()
  );
}

export default Planets;
