import React, { useContext, useEffect } from 'react';
import SWContext from '../context/SWContext';
import getPlanetsFromAPI from '../services/Api';
import HeaderTable from './HeaderTable';

export default function Table() {
  const { planets, savePlanets, isLoading, changeLoading } = useContext(SWContext);

  function savePlanetsfromApi() {
    changeLoading();
    getPlanetsFromAPI(savePlanets);
  }

  useEffect(savePlanetsfromApi, []);

  function renderTable() {
    return (
      <table>
        <thead>
          <tr>
            <HeaderTable />
          </tr>
        </thead>
        <tbody>
          { planets.map((planet, index) => (
            <tr key={ index }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      {
        isLoading
          ? <h3>carregando...</h3>
          : renderTable()
      }
    </div>
  );
}
