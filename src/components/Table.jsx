import React, { useContext, useEffect, useState } from 'react';
import { StarWarsContext } from '../context/Provider';
import requestPlanets from '../services/api';
import InputsComponents from './InputsComponets';
import SortBar from './SortBar';

function Table() {
  const valuesArray = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const valueFor = [
    'maior que',
    'menor que',
    'igual a',
  ];

  const dataState = [];
  const obj = {};
  const [inputFilt, setInputFilt] = useState(obj);
  const [dataOrigin, setDataOrigin] = useState(dataState);
  const [filtersArray, setFiltersArray] = useState(valuesArray);
  const { data, filters, setFilters, setData } = useContext(StarWarsContext);

  useEffect(() => {
    async function fetchData() {
      const result = await requestPlanets();
      setDataOrigin(result);
    }
    fetchData();
  }, []);

  const handleChangeSelect = ({ target: { name, value } }) => {
    setInputFilt({
      ...inputFilt,
      [name]: value,
    });
  };

  const selectsFilter = () => (
    <>
      <select data-testid="column-filter" name="column" onChange={ handleChangeSelect }>
        <option>Select option</option>
        {filtersArray
          .map((element) => <option value={ element } key={ element }>{element}</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChangeSelect }
      >
        <option>Select option</option>
        {valueFor
          .map((element) => <option value={ element } key={ element }>{element}</option>)}
      </select>
    </>
  );

  const inputFilter = () => (
    <input data-testid="value-filter" name="value" onChange={ handleChangeSelect } />
  );

  const valuesForFilter = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues,
        inputFilt],
    });
  };

  const btn = () => (
    <button
      type="button"
      data-testid="button-filter"
      onClick={ valuesForFilter }
    >
      Filtrar
    </button>
  );

  const deleteFilterArray = () => {
    const elementDEl = filtersArray.filter((filtered) => filtered !== inputFilt.column);
    setFiltersArray(
      [...elementDEl],
    );
  };

  const xablau = () => {
    if (filters.filterByNumericValues.length === 0) {
      return data;
    }
    const { filterByNumericValues } = filters;

    filterByNumericValues.forEach((element) => {
      const { comparison, column: compareKey, value } = element;
      switch (comparison) {
      case 'maior que':
        setData(
          [...dataOrigin
            .filter((planet) => Number(planet[compareKey]) > Number(value))],
        );
        return data;
      case 'menor que':
        setData(
          [...dataOrigin
            .filter((planet) => Number(planet[compareKey]) < Number(value))],
        );
        return data;
      case 'igual a':
        setData(
          [...dataOrigin
            .filter((planet) => Number(planet[compareKey]) === Number(value))],
        );
        return data;
      default:
        return data;
      }
    });
    deleteFilterArray();
  };

  const handleClick = (currentColumn) => {
    const { filterByNumericValues } = filters;

    const newArray = filterByNumericValues
      .filter((filter) => filter.column !== currentColumn);

    const outroValor = filterByNumericValues
      .find((filter) => filter.column === currentColumn);

    setFiltersArray([
      ...filtersArray,
      outroValor.column,
    ]);

    setFilters({
      ...filters,
      filterByNumericValues: [...newArray],
    });

    setData(dataOrigin);
  };

  const filterUsed = () => {
    const { filterByNumericValues } = filters;
    return (
      <>
        <table>
          <InputsComponents />
        </table>
        <div>
          {selectsFilter()}
          {inputFilter()}
          {btn()}
        </div>
        <div>
          {filterByNumericValues.map((filter) => (
            <span
              data-testid="filter"
              type="button"
              key={ filter.column }
            >
              {filter.column}
              <button
                type="button"
                onClick={ () => handleClick(filter.column) }
              >
                X
              </button>
            </span>
          ))}
        </div>
      </>
    );
  };

  useEffect(() => {
    xablau();
  }, [filters]);

  if (!data.length) return <h1>Loading...</h1>;

  if (filters.filterByNumericValues.length !== 0) {
    return filterUsed();
  }

  return (
    <>
      <table>
        <InputsComponents />
      </table>
      <div>
        {selectsFilter()}
        {inputFilter()}
        {btn()}
      </div>
      <SortBar />
    </>
  );
}

export default Table;
