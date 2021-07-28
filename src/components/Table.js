import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import allTableFilters from '../helpers/allTableFilters';
import FilmCell from './FilmCell';
import './Table.css';

function Table() {
  const context = useContext(PlanetsContext);
  const filteredPlanets = allTableFilters(context);
  const TEN = 10;

  return (
    <table className="planets-table">
      <thead className="planets-table-head">
        <tr>
          <th>Nome</th>
          <th>Diâmetro</th>
          <th>População</th>
          <th>Período Orbital</th>
          <th>Período Rotacional</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Água Superficial</th>
          <th>Terreno</th>
          <th>Filmes</th>
          <th>Criado em</th>
          <th>Editado em</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody className="planets-table-body">
        { filteredPlanets.map((planet, index) => {
          const {
            climate, created, diameter, edited, films, gravity, name,
            orbital_period: orbital, population, rotation_period: rotation,
            surface_water: surface, terrain, url,
          } = planet;
          return (
            <tr key={ index }>
              <td data-testid="planet-name">{ name }</td>
              <td>{ diameter }</td>
              <td>{ population }</td>
              <td>{ orbital }</td>
              <td>{ rotation }</td>
              <td>{ climate }</td>
              <td>{ gravity }</td>
              <td>{ surface }</td>
              <td>{ terrain }</td>
              <td>
                { films.map((film, filmIndex) => (
                  <FilmCell film={ film } key={ filmIndex } />
                )) }
              </td>
              <td>{ created.slice(0, TEN) }</td>
              <td>{ edited.slice(0, TEN) }</td>
              <td>
                <a rel="noreferrer" href={ url } target="_blank">
                  { `Planet ${name}` }
                </a>
              </td>
            </tr>
          );
        }) }
      </tbody>
    </table>
  );
}

export default Table;
