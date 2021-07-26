import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const {
    data, filters: { filterByName: { nameToFilter } },
  } = useContext(PlanetsContext);

  const filteredPlanets = data.filter(({ name }) => (
    name.toLowerCase().includes(nameToFilter)
  ));

  return (
    <table>
      <thead>
        <tr>
          <th>Clima</th>
          <th>Criado em</th>
          <th>Diâmetro</th>
          <th>Editado em</th>
          <th>Filmes</th>
          <th>Gravidade</th>
          <th>Nome</th>
          <th>Período Orbital</th>
          <th>População</th>
          <th>Período Rotacional</th>
          <th>Água Superficial</th>
          <th>Terreno</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { filteredPlanets.map((planet, index) => {
          const {
            climate, created, diameter, edited, films, gravity, name,
            orbital_period: orbital, population, rotation_period: rotation,
            surface_water: surface, terrain, url,
          } = planet;
          return (
            <tr key={ index }>
              <td>{ climate }</td>
              <td>{ created }</td>
              <td>{ diameter }</td>
              <td>{ edited }</td>
              <td>{ films.map((film) => <p key={ film }>{ film }</p>) }</td>
              <td>{ gravity }</td>
              <td>{ name }</td>
              <td>{ orbital }</td>
              <td>{ population }</td>
              <td>{ rotation }</td>
              <td>{ surface }</td>
              <td>{ terrain }</td>
              <td>{ url }</td>
            </tr>
          );
        }) }
      </tbody>
    </table>
  );
}

export default Table;
