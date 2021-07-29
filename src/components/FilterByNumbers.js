import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterByNumbers() {
  const myContext = useContext(PlanetsContext);
  const { filters, setFilters } = myContext;
  const { colunFilter, comparisonFilter, filterByNumericValues } = filters;

  // state dos filtros, setado a partir dos states setados no provider.
  const [filterByNumber, setFilterByNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '',
  });
  // função que conecta os dados do context com cada select - target-.
  function setFilter({ target }) {
    const { value, name } = target;
    setFilterByNumber({
      ...filterByNumber,
      [name]: value,
    });
  }
  // função que vai configurar apenas os filtros numéricos no button
  // Remove filtros indesejados.
  // A função permite que "escolhamos" os filtros que queremos,sobrescrevendo com a seleção o estado anterior.
  function sendFilter(column) {
    setFilters({
      ...filters,
      update: true,
      colunFilter: [...colunFilter.filter((colunElement) => colunElement !== column)],
      filterByNumericValues: [...filterByNumericValues, filterByNumber],
    });
  }

  return (

    <>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ setFilter }
      >
        {colunFilter.map((column, index) => (
          <option key={ index } value={ column }>{ column }</option>
        ))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ setFilter }
      >
        {comparisonFilter.map((comparison, index) => (
          <option key={ index } value={ comparison }>{ comparison }</option>
        ))}
      </select>
      <input
        name="value"
        type="number"
        onChange={ setFilter }
        data-testid="value-filter"
      />
      <button
        type="button"
        onClick={ () => sendFilter(filterByNumber.column) }
        data-testid="button-filter"
      >
        Filtrar
      </button>
    </>
  );
}

export default FilterByNumbers;
