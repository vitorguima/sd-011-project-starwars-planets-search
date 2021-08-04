import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filters() {
  const [numericsFilter, setNumericFilters] = useState({
    column: '',
    comparison: '',
    value: '',
  });

  function handleChangeNumerics({ target }) {
    const { value, name } = target;
    setNumericFilters({
      ...numericsFilter,
      [name]: value,
    });
  }

  const { setFilters, filters, filterNumeric } = useContext(PlanetsContext);

  function handleChangeName({ target }) {
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
  }

  // console.log(numericsFilter);

  return (
    <div>
      <input
        data-testid="name-filter"
        name="name"
        onChange={ handleChangeName }
        placeholder="Buscar pelo nome"
      />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleChangeNumerics }
      >
        <option>selecione</option>
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleChangeNumerics }
      >
        <option>selecione</option>
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>
      <input
        data-testid="value-filter"
        name="value"
        type="number"
        placeholder="Digite um valor"
        onChange={ handleChangeNumerics }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => filterNumeric(numericsFilter) }
      >
        Buscar
      </button>
    </div>
  );
}

export default Filters;
