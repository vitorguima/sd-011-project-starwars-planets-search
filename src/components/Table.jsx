import React, { useContext, useEffect, useState } from 'react';
import SWContext from '../context/SWContext';
import getPlanetsFromAPI from '../services/Api';
import HeaderTable from './HeaderTable';

export default function Table() {
  const {
    planets,
    savePlanets,
    isLoading,
    changeLoading,
    filters,
    setFilters,
    planetsToFilter,
    saveFilteredPlanets,
    addFilterByNumericValue,
  } = useContext(SWContext);

  const [filterName, setFilterName] = useState('');

  function savePlanetsfromApi() {
    changeLoading();
    getPlanetsFromAPI(savePlanets);
  }

  useEffect(savePlanetsfromApi, []);

  function filterPlanetsByName() {
    const filteredPlanetsByName = planetsToFilter.filter((planet) => (
      (new RegExp(filterName, 'i')).test(new RegExp(planet.name, 'i'))
    ));
    saveFilteredPlanets(filteredPlanetsByName);
  }

  const initialArrayColum = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const initialNumericValues = {
    column: '',
    comparison: '',
    value: '',
  };

  // const [arrayColumn] = useState(initialArrayColum);
  const [numericValues, setNumericValues] = useState(initialNumericValues);
  const [filteredColumn, setFilteredColumn] = useState(initialArrayColum);

  function filterColumn() {
    const columnsUsed = filters.filterByNumericValues.map((filter) => filter.column);
    let unusedColumns = [];
    columnsUsed.forEach((column) => {
      unusedColumns = filteredColumn.filter((itemColumn) => itemColumn !== column);
    });
    setFilteredColumn(unusedColumns);
  }

  function filterPlanetsByNumericValues() {
    const { comparison, column, value } = numericValues;
    switch (comparison) {
    case 'maior que':
      return (
        planets.filter((planet) => (
          parseFloat(planet[column]) > parseFloat(value)))
      );
    case 'menor que':
      return (
        planets.filter((planet) => (
          parseFloat(planet[column]) < parseFloat(value)))
      );
    case 'igual a':
      return (
        planets.filter((planet) => (
          parseFloat(planet[column]) === parseFloat(value)))
      );
    default:
      break;
    }
  }

  function saveNewFilterNumeric() {
    addFilterByNumericValue(numericValues);
    const filteredPlanetsBynumericValue = filterPlanetsByNumericValues();
    saveFilteredPlanets(filteredPlanetsBynumericValue);
    console.log(filteredPlanetsBynumericValue);
    filterColumn();
  }

  function handlerNumericValues({ target }) {
    const { name, value } = target;
    setNumericValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  useEffect(filterPlanetsByName, [filterName, planetsToFilter, numericValues]);

  function renderFilterNumericValues() {
    return (
      <div className="filter-numeric-section">
        <select
          name="column"
          data-testid="column-filter"
          onChange={ (e) => handlerNumericValues(e) }
        >
          { filteredColumn.map((column, index) => (
            <option
              key={ index }
              value={ column }
            >
              { column }
            </option>
          ))}
          {/* <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option> */}
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          onChange={ (e) => handlerNumericValues(e) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          name="value"
          onChange={ (e) => handlerNumericValues(e) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => saveNewFilterNumeric() }
        >
          Filtrar
        </button>
      </div>
    );
  }

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
      <div className="filter-name-section">
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
        { renderFilterNumericValues() }
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
