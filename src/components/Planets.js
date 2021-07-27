import React, { useEffect, useState } from 'react';
import getPlanets from '../services/data';

function Planets() {
  const [content, arrContent] = useState([]);
  const arrPlanets = async () => {
    const arr = await getPlanets().then((e) => e.results);
    arrContent(arr);
    return arr;
  };

  useEffect(() => {
    arrPlanets();
  }, []);

  return (
    <table>
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
      {
        content.map((e, i) => {
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
    </table>
  );
}

export default Planets;
