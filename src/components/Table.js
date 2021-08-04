import React, { useContext, useEffect } from 'react';
import starwarsPlanetsContext from '../context/starwarsPlanetsContext';
import getPlanetsApi from '../services/Api';

function Table() {
  const {
    data,
    setData,
    isLoading,
    setIsLoading,
    filters,
    setFilters,
    savePlanets,
    setSavePlanets,
  } = useContext(starwarsPlanetsContext);

  function saveData(planets) {
    setData(planets);
    setIsLoading(false);
  }

  function setLoading() {
    setIsLoading(true);
  }

  function setPlanetsApi() {
    setLoading();
    getPlanetsApi(saveData);
  }

  useEffect(setPlanetsApi, []);

  const handleChangeInput = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { ...filters.filterByName, name: value },
    });

    const filterPlanet = data.filter((planet) => planet.name.includes(value));
    setSavePlanets(filterPlanet);
  };

  const handleChangeFilters = ({ target: { name, value } }) => {
    setFilters({
      ...filters,
      filterByNumericValues: { ...filters.filterByNumericValues, [name]: value },
    });
  };

  const handleClickBtnFilter = () => {
    const { filterByNumericValues: { column, comparison, value } } = filters;

    let filtered = [];

    if (comparison === 'maior que') {
      filtered = data.filter((planet) => (
        parseInt(planet[column], 10) > parseInt(value, 10)));
    } else if (comparison === 'menor que') {
      filtered = data.filter((planet) => (
        parseInt(planet[column], 10) < parseInt(value, 10)));
    } else {
      filtered = data.filter((planet) => (
        planet[column] === value));
    }

    setSavePlanets(filtered);
  };

  function table() {
    const { filterByName: { name }, filterByNumericValues: { column, value } } = filters;
    const headers = Object.keys(data[0]);

    const optionsColumn = [
      'selecione',
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];

    const optionsComparison = ['maior que', 'menor que', 'igual a'];

    return (
      <>
        <div>
          <input
            type="text"
            value={ name }
            onChange={ handleChangeInput }
            data-testid="name-filter"
          />
          <select
            onChange={ handleChangeFilters }
            data-testid="column-filter"
            name="column"
            value={ column }
          >
            {optionsColumn.map((option, index) => (
              <option
                key={ index }
                value={ option }
              >
                { option }
              </option>))}
          </select>
          <select
            onChange={ handleChangeFilters }
            data-testid="comparison-filter"
            name="comparison"
          >
            {optionsComparison.map((option, index) => (
              <option
                key={ index }
              >
                { option }
              </option>))}
          </select>
          <input
            type="number"
            name="value"
            value={ value }
            onChange={ handleChangeFilters }
            data-testid="value-filter"
          />
          <button
            type="button"
            onClick={ () => handleClickBtnFilter() }
            data-testid="button-filter"
          >
            Filtrar
          </button>
        </div>
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                header !== 'residents'
                  ? <th key={ `header${index}` }>{header}</th>
                  : ''
              ))}
            </tr>
          </thead>
          <tbody>
            {
              savePlanets.length !== 0
                ? savePlanets.map((planet) => (
                  <tr key={ `${planet.name$}` }>
                    { headers.map((header, index) => (
                      <td key={ `${planet.name}${index}` }>{ planet[header] }</td>
                    )) }
                  </tr>
                ))
                : data.map((planet, index1) => (
                  <tr key={ `${planet.name$}${index1}` }>
                    { headers.map((header, index2) => (
                      <td key={ `${planet.name}${index2}` }>{ planet[header] }</td>
                    )) }
                  </tr>
                ))
            }
          </tbody>
        </table>
      </>
    );
  }

  return (
    <div>
      {
        isLoading
          ? <span>Carregando...</span>
          : table()
      }
    </div>
  );
}

export default Table;
