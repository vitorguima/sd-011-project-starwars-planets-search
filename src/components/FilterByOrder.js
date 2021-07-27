import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './FilterByOrder.css';

function FilterByOrder() {
  const [orderColumn, setOrderColumn] = useState('name');
  const [orderSort, setOrderSort] = useState('ASC');

  const { data, contextFunctions: { newOrderSort } } = useContext(PlanetsContext);

  function handleOrderColumnChange({ target: { value } }) {
    setOrderColumn(value);
  }

  function handleOrderSortChange({ target: { id } }) {
    setOrderSort(
      id.includes('asc') ? 'ASC' : 'DESC',
    );
  }

  return (
    <div className="filter-by-order-container">
      <p className="filter-by-order-title">Ordenar por</p>
      <div className="filter-by-order-inputs">
        <label
          htmlFor="column-sort"
          className="form-label filter-by-order-column-label"
        >
          Coluna
          <select
            onChange={ handleOrderColumnChange }
            id="column-sort"
            data-testid="column-sort"
            className="form-select"
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
        <label className="form-check-label" htmlFor="column-sort-input-asc">
          Ascendente
          <input
            type="radio"
            id="column-sort-input-asc"
            name="column-sort-input"
            data-testid="column-sort-input-asc"
            defaultChecked
            className="form-check-input"
            onChange={ handleOrderSortChange }
          />
        </label>
        <label htmlFor="column-sort-input-desc" className="form-check-label">
          Descendente
          <input
            className="form-check-input"
            type="radio"
            name="column-sort-input"
            id="column-sort-input-desc"
            data-testid="column-sort-input-desc"
            onChange={ handleOrderSortChange }
          />
        </label>
        <button
          className="btn btn-warning"
          type="button"
          data-testid="column-sort-button"
          onClick={ () => newOrderSort(orderColumn, orderSort) }
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default FilterByOrder;
