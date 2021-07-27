import React, { useContext, useEffect, useState } from 'react';
import SWContext from '../context/SWContext';
import getPlanetsFromAPI from '../services/Api';
import HeaderTable from './HeaderTable';

export default function Table() {
  const [filterName, setFilterName] = useState('');

  const {
    planets,
    savePlanets,
    isLoading,
    changeLoading,
    setFilters,
    planetsToFilter,
    saveFilteredPlanets,
  } = useContext(SWContext);

  function savePlanetsfromApi() {
    changeLoading();
    getPlanetsFromAPI(savePlanets);
  }

  function filterPlanetsByName() {
    const filteredPlanetsByName = planetsToFilter.filter((planet) => (
      (new RegExp(filterName, 'i')).test(new RegExp(planet.name, 'i'))
    ));
    console.log(filteredPlanetsByName);
    saveFilteredPlanets(filteredPlanetsByName);
  }

  useEffect(savePlanetsfromApi, []);
  useEffect(filterPlanetsByName, [filterName, planetsToFilter]);

  function handlerChangeName({ target }) {
    const { value } = target;
    setFilterName(value);
  }

  function setFilterNameContext() {
    setFilters(filterName);
  }
  useEffect(setFilterNameContext, [filterName]);

  function renderFilterName() {
    return (
      <div className="filters-section">
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (e) => handlerChangeName(e) }
          value={ filterName }
        />
      </div>
    );
  }

  function renderTable() {
    return (
      <section>
        { renderFilterName() }
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
      </section>
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
