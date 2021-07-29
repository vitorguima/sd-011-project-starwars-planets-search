import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Head() {
  const { filterByName, filterByNumericValues } = useContext(PlanetsContext);
  const [onChangeState, setOnChangeState] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setOnChangeState({
      ...onChangeState,
      [name]: value,
    });
  };

  return (
    <>
      <input
        data-testid="name-filter"
        placeholder="Filtering by name"
        type="text"
        onChange={ ({ target }) => {
          filterByName(target.value);
        } }
      />
      <section>
        <select name="column" data-testid="column-filter" onChange={ handleChange }>
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          onChange={ handleChange }
          name="comparison"
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
        <input
          data-testid="value-filter"
          onChange={ handleChange }
          name="value"
          type="number"
          placeholder="Filtering by numeric feature"
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => filterByNumericValues(onChangeState) }
        >
          Filtrar
        </button>
      </section>
    </>
  );
}

export default Head;
