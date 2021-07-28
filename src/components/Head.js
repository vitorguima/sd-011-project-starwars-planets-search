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
          <option value="">Choose one</option>
          <option value="rotation_period">Periodo de rotação</option>
          <option value="orbital_period">Periodo orbitação</option>
          <option value="diameter">Diâmetro</option>
          <option value="surface_water">Água na superfície</option>
          <option value="population">População</option>
        </select>
        <select
          onChange={ handleChange }
          name="comparison"
          data-testid="comparison-filter"
        >
          <option value="">Choose one</option>
          <option value="maior que">Maior que</option>
          <option value="menor que">Menor que</option>
          <option value="igual a">Igual a</option>
        </select>
        <input
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
