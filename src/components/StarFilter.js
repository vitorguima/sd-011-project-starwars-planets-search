import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import StarContext from '../contexts/starContext';

export default function StarFilter() {
  const { setFilters, filters } = useContext(StarContext);
  const [numberFilter, setNumberFilter] = useState({
    column: 'populaion',
    comparison: 'maior que',
    value: undefined,
  });

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
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          name="comparison"
          onChange={ handleFilterNumber }
          data-testid="comparison-filter"
        >
          <option>maior que</option>
          <option>igual a</option>
          <option>menor que</option>
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
