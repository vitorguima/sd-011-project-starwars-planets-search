import React, { useContext, useState, useEffect } from 'react';
import { MyContext } from '../context/MyContext';

function Table() {
  const { planets, filter, searchPlanet } = useContext(MyContext);
  const [filterPlanets, setFilterPlanets] = useState([]);

  function filterPlanet() {
    const getPlanet = planets
      .filter((planet) => (planet.name.toLowerCase().includes(filter.toLowerCase())));
    setFilterPlanets(getPlanet);
  }

  function filterData(objectData) {
    const { column } = searchPlanet[0];
    const { comparison } = searchPlanet[1];
    const { value } = searchPlanet[2];

    if (comparison === 'maior que') {
      return objectData
        .filter((element) => parseFloat(element[column]) > parseFloat(value));
    }
    if (comparison === 'menor que') {
      return objectData
        .filter((element) => parseFloat(element[column]) < parseFloat(value));
    }
    if (comparison === 'igual a') {
      return objectData
        .filter((element) => parseFloat(element[column]) === parseFloat(value));
    }
  }

  useEffect(() => {
    setFilterPlanets(filterData(planets));
  }, [searchPlanet]);

  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const data = await fetch(endpoint)
        .then((results) => results.json());
      setFilterPlanets(data.results);
    };
    getPlanets();
  }, []);

  useEffect(() => {
    filterPlanet();
  }, [filter]);

  return (
    <>
      {
        searchPlanet ? (
          <button
            data-testid="filter"
            type="button"
            onClick={ () => setFilterPlanets(planets) }
          >
            X
          </button>) : ''
      }
      <table>

        <thead>
          <tr>
            <th>Nome</th>
            <th>Período de Rotação</th>
            <th>Período Orbital</th>
            <th>Diâmetro</th>
            <th>Clima</th>
            <th>Gravidade</th>
            <th>Terreno</th>
            <th>Água da Superfície</th>
            <th>População</th>
            <th>Filmes</th>
            <th>Criado</th>
            <th>Editado</th>
            <th>URL</th>
          </tr>
        </thead>

        <tbody>
          {filterPlanets.map((planet) => (
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
