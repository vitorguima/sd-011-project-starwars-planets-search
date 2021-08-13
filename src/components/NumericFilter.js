import React, { useContext, useState } from 'react';
import PlanetContext from '../context/PlanetContext';

function NumericFilter() {
  const [state, setState] = useState({});
  const {
    setFilters,
    setSearchByNumeric,
    setSearchByName,
  } = useContext(PlanetContext);

  function handleChange({ target: { name, value } }) {
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleClick() {
    const filtersAreSelected = state.column && state.comparision && state.value;

    if (filtersAreSelected) {
      setFilters({
        filterByName: {
          name: '',
        },
        filterByNumericValues: [
          {
            column: state.column,
            comparision: state.comparision,
            value: state.value,
          },
        ],
      });
      setSearchByNumeric(true);
      setSearchByName(false);
    }
  }

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChange }
      >
        <option defaultValue>Escolha uma opção</option>
        <option value="population">population</option>
        <option value="orbital period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparision"
        onChange={ handleChange }
      >
        <option defaultValue>Escolha uma opção</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>

  );
}

export default NumericFilter;
