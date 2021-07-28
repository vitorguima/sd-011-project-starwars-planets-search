import React, { useEffect, useState } from 'react';

function Table() {
  const [apiResultCopy, setApiResultCopy] = useState([]);
  const [apiResult, setApiResult] = useState([]);
  const [filterData, setFilterData] = useState([
    { filterByName: { name: '' } },
    { filterByNumericValues: {
      column: 'population', comparison: 'maior que', value: '' } },
  ]);
  const num = 13;

  useEffect(() => {
    const request = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((data) => data.json());
      setApiResult(results);
      setApiResultCopy(results);
    };

    request();
  }, []);

  const filterPlanets = (filText) => {
    if (filText.length > 0) {
      const updateFilter = filterData;
      updateFilter[0].filterByName.name = filText;
      setFilterData(updateFilter);
      const filteredPlanets = apiResult.filter((planet) => (
        (planet.name).includes(filText)));
      setApiResult(filteredPlanets);
    } else {
      setApiResult(apiResultCopy);
      const updateFilter = filterData;
      updateFilter[0].filterByName.name = '';
      setFilterData(updateFilter);
    }
  };

  const getHeader = () => {
    const request = apiResult[0];
    if (request) {
      const get = Object.keys(request);
      return (get.map((currentKey, index) => (
        index <= num && currentKey !== 'residents' ? (
          <th>
            { currentKey }
          </th>
        ) : null
      )));
    }
  };

  const tableRows = () => {
    if (apiResult) {
      const planets = apiResult.map((_, index) => (
        Object.values({ ...apiResult[index] })
      ));
      return planets.map((planet, n) => (
        <tr key={ n }>{ planet.map((infos, i) => <td key={ i }>{ infos }</td>) }</tr>
      ));
    }
  };

  const setSelectFilters = (targetValue, type) => {
    const updateFilter = filterData;
    updateFilter[1].filterByNumericValues[type] = targetValue;
    setFilterData(updateFilter);
    const removeSelection = document.getElementById(targetValue);
    console.log(removeSelection);
    if (removeSelection) {
      removeSelection.remove();
    }
  };

  const renderFilteredPlanets = () => {
    const { column, comparison, value } = filterData[1].filterByNumericValues;
    let planetsToRender;
    if (comparison === 'maior que') {
      planetsToRender = apiResult.filter((planet) => (
        planet[column] > parseInt(value, 10)
      ));
    }
    if (comparison === 'menor que') {
      planetsToRender = apiResult.filter((planet) => (
        planet[column] < parseInt(value, 10)
      ));
    }
    if (comparison === 'igual a') {
      planetsToRender = apiResult.filter((planet) => (
        planet[column] === value
      ));
    }
    setApiResult(planetsToRender);
  };

  return (
    <div>
      <input
        id="input-filter"
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => filterPlanets(target.value) }
      />
      <select
        data-testid="column-filter"
        onChange={ ({ target }) => setSelectFilters(target.value, 'column') }
      >
        <option value="population" id="population">population</option>
        <option value="orbital_period" id="orbital_period">orbital_period</option>
        <option value="diameter" id="diameter">diameter</option>
        <option value="rotation_period" id="rotation_period">rotation_period</option>
        <option value="surface_water" id="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        onChange={ ({ target }) => setSelectFilters(target.value, 'comparison') }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ ({ target }) => setSelectFilters(target.value, 'value') }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => renderFilteredPlanets() }
      >
        Filter
      </button>
      <div>
        <table>
          <thead>
            <tr>
              {getHeader()}
            </tr>
          </thead>
          <tbody>
            {tableRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
