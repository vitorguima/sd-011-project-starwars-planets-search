import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/Context';

function Filters() {
  const { setFilters, filters } = useContext(PlanetsContext);
  /*  const {
    filterByNumericValues: { column },
  } = Filters; */
  const [numericFilters, setNumericFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const filterType = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const filterOptions = ['maior que', 'menor que', 'igual a'];
  /* aqui pego o meu texto digitado no  input */
  function handleTextInput({ target }) {
    setFilters({
      ...filters,
      filterByName: {
        name: target.value,
      },
    });
  }

  /* aqui é meu  dropdown onde eu seleciono minha opção de planeta */
  function handleNumericFilters({ target }) {
    setNumericFilters({
      ...numericFilters,
      [target.name]: target.value,
    });
  }
  /* aqui é minha caixa de texto numerico, que esta sendo adicionado no click botão Filtrar */
  function handleFilterButton() {
    setFilters({
      ...filters,
      filterByNumericValues: numericFilters,
    });
  }

  return (
    <>

      <input
        type="text"
        data-testid="name-filter"
        onChange={ (e) => handleTextInput(e) }
      />
      <select
        name="column"
        onChange={ (e) => handleNumericFilters(e) }
        data-testid="column-filter"
      >
        {filterType.map((filter) => <option key={ filter }>{filter}</option>)}

      </select>

      <select
        name="comparison"
        onChange={ (e) => handleNumericFilters(e) }
        data-testid="comparison-filter"
      >
        {filterOptions.map((filter) => (
          <option key={ filter }>{filter}</option>
        ))}
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        onChange={ (e) => handleNumericFilters(e) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleFilterButton() }
      >
        Filtrar
      </button>

    </>
  );
}

export default Filters;
