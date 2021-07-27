import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import './FilterByNumericValues.css';

function FilterByNumericValues() {
  const {
    contextFunctions: { newNumericValuesFilter },
    filters: { columnFiltersAvailable },
  } = useContext(PlanetsContext);

  return (
    <div className="filter-by-numeric-container">
      <p className="filter-by-numeric-title">Outros filtros</p>
      <div className="filter-by-numeric-inputs">
        <label
          htmlFor="column-filter"
          className="form-label filter-by-numeric-column-label"
        >
          Tipo
          <select
            className="form-select"
            id="column-filter"
            data-testid="column-filter"
          >
            { columnFiltersAvailable.map((column, index) => (
              <option key={ index }>{ column }</option>
            )) }
          </select>
        </label>
        <label htmlFor="comparison-filter" className="form-label">
          Comparação
          <select
            id="comparison-filter"
            className="form-select"
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label
          htmlFor="value-filter"
          className="form-label filter-by-numeric-value-label"
        >
          Valor
          <input
            className="form-control"
            type="number"
            id="value-filter"
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          className="btn btn-warning filter-by-numeric-btn"
          onClick={ newNumericValuesFilter }
        >
          Adicionar Filtro
        </button>
      </div>
    </div>
  );
}

export default FilterByNumericValues;
