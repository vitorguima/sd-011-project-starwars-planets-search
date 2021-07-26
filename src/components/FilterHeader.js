import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function FilterHeader() {
  const [orderColumn, setOrderColumn] = useState('name');
  const [orderSort, setOrderSort] = useState('ASC');

  const {
    data,
    contextFunctions: {
      handleNameFilterChange,
      newNumericValuesFilter,
      newOrderSort,
    },
    filters: { columnFiltersAvailable },
  } = useContext(PlanetsContext);

  function handleOrderColumnChange({ target: { value } }) {
    setOrderColumn(value);
  }

  function handleOrderSortChange({ target: { id } }) {
    setOrderSort(
      id.includes('asc') ? 'ASC' : 'DESC',
    );
  }

  return (
    <header>
      <div>
        <label htmlFor="name-filter">
          Filtrar pelo nome:
          <input
            id="name-filter"
            type="text"
            data-testid="name-filter"
            onChange={ handleNameFilterChange }
            placeholder="Digite o nome do planeta"
          />
        </label>
      </div>

      <div>
        <p>Outros filtros:</p>
        <label htmlFor="column-filter">
          Tipo
          <select id="column-filter" data-testid="column-filter">
            { columnFiltersAvailable.map((column, index) => (
              <option key={ index }>{ column }</option>
            )) }
          </select>
        </label>
        <label htmlFor="comparison-filter">
          Comparação
          <select id="comparison-filter" data-testid="comparison-filter">
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value-filter">
          Valor
          <input
            type="number"
            id="value-filter"
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ newNumericValuesFilter }
        >
          Adicionar Filtro
        </button>
      </div>

      <div>
        <p>Ordenar por:</p>
        <label htmlFor="column-sort">
          Coluna
          <select
            onChange={ handleOrderColumnChange }
            id="column-sort"
            data-testid="column-sort"
          >
            {
              data[0] !== undefined
                ? Object.keys(data[0]).map((column, index) => (
                  <option key={ index }>{ column }</option>
                ))
                : <option>Carregando</option>
            }
          </select>
        </label>
        <label htmlFor="column-sort-input-asc">
          Ascendente
          <input
            type="radio"
            id="column-sort-input-asc"
            name="column-sort-input"
            data-testid="column-sort-input-asc"
            defaultChecked
            onChange={ handleOrderSortChange }
          />
        </label>
        <label htmlFor="column-sort-input-desc">
          Descendente
          <input
            type="radio"
            name="column-sort-input"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            onChange={ handleOrderSortChange }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => newOrderSort(orderColumn, orderSort) }
        >
          Ordenar
        </button>
      </div>
    </header>
  );
}

export default FilterHeader;
