import React from 'react';
import PropTypes from 'prop-types';
import { useGlobalContext } from '../hooks/Context';

const Table = () => {
  const { Filtredplanets, isLoading } = useGlobalContext();

  if (!Filtredplanets.length) {
    return <h1 className="loader">No results found</h1>;
  }
  if (isLoading) {
    return <h1 className="loader">Loading...</h1>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Período de Rotação</th>
          <th>Período de Órbita</th>
          <th>Diâmetro</th>
          <th>Clima</th>
          <th>Gravidade</th>
          <th>Terreno</th>
          <th>Água na Superfície</th>
          <th>População</th>
          <th>Filmes</th>
          <th>Criado</th>
          <th>Editado</th>
          <th>Url</th>
        </tr>
      </thead>
      <tbody>
        {Filtredplanets.map((planet) => (
          <tr key={ planet.name }>
            <td>{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>
              {planet.films
                .map((film, idx) => <div key={ idx }>{film}</div>)}
            </td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  filtredPlanets: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default Table;
