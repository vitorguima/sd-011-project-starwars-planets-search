import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import StarContext from '../contexts/starContext';

export default function StarFilter() {
  const { setFilters, filters } = useContext(StarContext);
  const [numberFilter, setNumberFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: undefined,
  });

  const numberFilters = filters.filterByNumericValues;

  const handleFilterName = ({ target: { value } }) => setFilters({
    ...filters,
    filterByName: { name: value },
  });

  const handleFilterNumber = ({ target: { name, value } }) => {
    setNumberFilter({
      ...numberFilter,
      [name]: value,
    });
  };

  const handleFilters = () => setFilters({
    ...filters,
    filterByNumericValues: filters.filterByNumericValues.concat(numberFilter),
  });

  const renderFilters = () => numberFilters.map((element, index) => (
    <li key={ index } data-testid="filter">
      <span>{ `${element.column} ${element.comparison} ${element.value}` }</span>
      <button
        type="button"
        onClick={ () => setFilters({
          ...filters,
          filterByNumericValues: filters.filterByNumericValues
            .filter((value) => value.column !== element.column),
        }) }
      >
        X
      </button>
    </li>
  ));

  return (
    <HeaderStyle>
      <div>
        <form>
          <input
            type="text"
            name="nameFilter"
            data-testid="name-filter"
            placeholder="search"
            onChange={ handleFilterName }
          />
        </form>
      </div>
      <div>
        <select
          name="column"
          onChange={ handleFilterNumber }
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          name="comparison"
          onChange={ handleFilterNumber }
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
        <input
          typer="number"
          name="value"
          onChange={ handleFilterNumber }
          data-testid="value-filter"
          placeholder="search number"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilters }
        >
          Filtrar
        </button>
      </div>
      <div>
        <ul>
          { renderFilters() }
        </ul>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  background-color: #55608f;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ffffff;

  form {
    display: flex;
    flex-wrap: wrap;

    & > input {
      border: none;
      flex: 1 1 10ch;
      margin: auto.5rem;

      &[type="text"] {
        flex: 3 1 30ch;
      }
    }
  }

`;
