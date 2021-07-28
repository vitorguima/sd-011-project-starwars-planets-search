import React, { useContext } from 'react';

import PlanetsContext from '../context/PlanetsContext';

function createTableTitles(titles) {
  return (
    <tr key={ titles }>
      { titles.map((title, index) => <th key={ index }>{ title }</th>) }
    </tr>
  );
}

function createInfosPlanetsTable(info) {
  return (
    info.map((value, index) => <td key={ index }>{ value }</td>)
  );
}

function createTable(planets) {
  if (planets.length < 1) return <span>Planeta não encontrado.</span>;
  return (
    <table>
      <tbody>
        { createTableTitles(Object.keys(planets[0])) }
        { planets.map((planet, index) => (
          <tr key={ index }>
            { createInfosPlanetsTable(Object.values(planet)) }
          </tr>
        )) }
      </tbody>
    </table>
  );
}

function filterPlanetName(list, name) {
  return list.filter((planet) => {
    const namePlanetUpper = planet.name.toUpperCase();
    const nameFilter = name.toUpperCase();
    return (namePlanetUpper.includes(nameFilter));
  });
}

function filterValueInfoPlanet(list, filters) {
  const { filterByNumericValues } = filters;
  let result;

  filterByNumericValues.forEach((filter) => {
    const { column, comparison, value } = filter;

    switch (comparison) {
    /**/case 'maior que':
      /**/result = list
      /**/.filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
      /**/break;
      /**/case 'menor que':
      /**/result = list
      /**/.filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
      /**/break;
    /**/default:
    /**/result = list
      /**/.filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
      /**/break;
    }
  });

  return result;
}

function Table() {
  const { planets, filters } = useContext(PlanetsContext);
  const { name } = filters.filterByName;
  const { filterByNumericValues } = filters;

  if (planets.length < 1) return <h1>Carregando...</h1>;

  planets.forEach((planet) => delete planet.residents);

  if (name) {
    const filteredByName = filterPlanetName(planets, name);

    if (filterByNumericValues.length > 0) {
      return createTable(filterValueInfoPlanet(filteredByName, filters));
    }

    return createTable(filteredByName);
  }

  if (filterByNumericValues.length > 0) {
    return createTable(filterValueInfoPlanet(planets, filters));
  }

  return createTable(planets);
}

export default Table;
