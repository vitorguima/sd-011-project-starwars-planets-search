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

  const { filterByName: { name } } = filters;

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

  const handleChange = ({ target: { value } }) => {
    setFilters({
      ...filters,
      filterByName: { ...filters.filterByName, name: value },
    });

    const filterPlanet = data.filter((planet) => planet.name.includes(value));
    setSavePlanets(filterPlanet);
  };

  function table() {
    const headers = Object.keys(data[0]);

    return (
      <>
        <div>
          <input
            type="text"
            value={ name }
            onChange={ handleChange }
            data-testid="name-filter"
          />
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
