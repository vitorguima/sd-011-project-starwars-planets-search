import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function createTableTitles(titles) {
  return (
    <tr>
      { titles.map((title, index) => <th key={ index }>{ title }</th>) }
    </tr>
  );
}

function createInfosPlanetsTable(info) {
  return (
    <tr>
      { info.map((value, index) => <td key={ index }>{ value }</td>) }
    </tr>
  );
}

function createTable(planets) {
  if (planets.length < 1) return <span>Planeta não encontrado.</span>;
  return (
    <div>
      { createTableTitles(Object.keys(planets[0])) }
      { planets.map((planet) => createInfosPlanetsTable(Object.values(planet))) }
    </div>
  );
}

function filterPlanetName(list, name) {
  return list.filter((planet) => {
    const namePlanetUpper = planet.name.toUpperCase();
    const nameFilter = name.toUpperCase();
    return (namePlanetUpper.includes(nameFilter));
  });
}

function Table() {
  const { planets, filters } = useContext(PlanetsContext);
  const { name } = filters.filterByName;

  if (planets.length < 1) return <h1>Carregando...</h1>;

  planets.forEach((planet) => delete planet.residents);

  if (name) {
    const filteredByName = filterPlanetName(planets, name);
    return createTable(filteredByName);
  }

  return createTable(planets);
}

export default Table;
