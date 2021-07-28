import React, { useContext } from 'react';
import StarWarsContext from './StarWarsContext';

function Table() {
  const { infos } = useContext(StarWarsContext);
  const { planetName, setPlanetName, data, column, setColum, comparison,
    setComparison, value, setValue, filterToApply, setFilterToApply,
    FilteredResults, setFilteredResults,
  } = infos;

  const filerByName = data.filter((item) => (
    item.name.toLowerCase().includes(planetName.toLowerCase())));

  function getKeys() {
    if (data[0]) {
      const keys = Object.keys(data[0]);
      return (
        keys.map((item, index) => <th key={ index }>{item}</th>)
      );
    }
  }

  function columSelectRender() {
    return (
      <select
        id="setColum"
        data-testid="column-filter"
        onChange={ (e) => setColum(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
    );
  }

  function comparisonSelectRender() {
    return (
      <select
        id="setComparison"
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
    );
  }

  function valueFieldInputRender() {
    return (
      <input
        id="setValue"
        type="number"
        data-testid="value-filter"
        onChange={ (e) => setValue(e.target.value) }
      />
    );
  }

  function filterBtnOnClickHandler() {
    setFilterToApply(true);
    if (comparison === 'maior que') {
      const filteredByFilters = data
        .filter((item) => Number(item[column]) > Number(value));
      return setFilteredResults(filteredByFilters);
    } if (comparison === 'menor que') {
      const filteredByFilters = data
        .filter((item) => Number(item[column]) < Number(value));
      return setFilteredResults(filteredByFilters);
    } if (comparison === 'igual a') {
      const filteredByFilters = data
        .filter((item) => Number(item[column]) === Number(value));
      return setFilteredResults(filteredByFilters);
    }
  }

  function applyFiltersBtnRender() {
    return (
      <div>
        <button
          data-testid="button-filter"
          type="button"
          onClick={ filterBtnOnClickHandler }
        >
          Add Filtros
        </button>
      </div>
    );
  }

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => setPlanetName(e.target.value) }
      />
      { columSelectRender() }
      { comparisonSelectRender() }
      { valueFieldInputRender() }
      { applyFiltersBtnRender() }
      <table>
        <thead>
          <tr>
            {getKeys()}
          </tr>
        </thead>
        <tbody>
          {
            !filterToApply ? filerByName.map((item, index) => (
              <tr key={ index }>
                {Object.values(item).map((tdName, index2) => (
                  <td key={ index2 }>{tdName}</td>))}
              </tr>)) : (
              FilteredResults.map((item, index) => (
                <tr key={ index }>
                  {Object.values(item).map((tdName, index2) => (
                    <td key={ index2 }>{tdName}</td>))}
                </tr>)))
          }
        </tbody>
      </table>
    </>
  );
}

export default Table;
