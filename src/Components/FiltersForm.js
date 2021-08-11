import React, { useContext, useState } from 'react';
import planetContext from '../Context/PlanetContext';
import { comparatorOptions } from '../Context/PlanetProvider';

function FiltersForm() {
  const { changeNameFilter, filters,
    numericFilters, columnOptions,
    orderButtonClick } = useContext(planetContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueState] = useState(0);
  const [columnSort, setColumnSort] = useState('name');
  const [directionSort, setDirectionSort] = useState('ASC');
  return (
    <form>
      <fieldset>
        <label htmlFor="name">
          Filtre pelo nome
          <input
            type="text"
            id="name"
            data-testid="name-filter"
            value={ filters.name }
            onChange={ ({ target: { value } }) => changeNameFilter(value) }
          />
          <input />
        </label>
      </fieldset>
      <fieldset>
        Selecione o filtro numérico
        <label htmlFor="column">
          tipo:
          <select
            id="column"
            data-testid="column-filter"
            value={ column }
            onChange={ ({ target: { value } }) => setColumn(value) }
          >
            {columnOptions.map((columnOtion, index) => (
              <option key={ index }>{columnOtion}</option>
            ))}
          </select>
        </label>

        <label htmlFor="comparison">
          comparação:
          <select
            id="comparison"
            data-testid="comparison-filter"
            value={ comparison }
            onChange={ ({ target: { value } }) => setComparison(value) }
          >
            {comparatorOptions.map((comparisonOtion, index) => (
              <option key={ index }>{comparisonOtion}</option>
            ))}
          </select>
        </label>

        <label htmlFor="value">
          valor:
          <input
            id="value"
            type="number"
            data-testid="value-filter"
            value={ valueFilter }
            onChange={ ({ target: { value } }) => setValueState(value) }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={
            () => numericFilters({ column, comparison, value: valueFilter })
          }
        >
          Filtrar
        </button>
      </fieldset>
      <fieldset>
        Ordenar
        <label htmlFor="sort">
          <select
            value={ columnSort }
            onChange={ ({ target: { value } }) => setColumnSort(value) }
            data-testid="column-sort"
          >
            {columnOptions
              .map((filterOption) => (
                <option key={ `${filterOption}-option` }>
                  { filterOption }
                </option>))}
          </select>
          <label htmlFor="ASC">
            Crescente
            <input
              type="radio"
              name="sort"
              data-testid="column-sort-input-asc"
              value="ASC"
              onChange={ ({ target: { value } }) => setDirectionSort(value) }
            />
          </label>
          <label htmlFor="DESC">
            Decrescente
            <input
              type="radio"
              data-testid="column-sort-input-desc"
              value="DESC"
              onChange={ ({ target: { value } }) => setDirectionSort(value) }
            />
          </label>
          <button
            type="button"
            data-testid="column-sort-button"
            onClick={ () => orderButtonClick(
              { column: columnSort, sort: directionSort },
            ) }
          >
            Ordenar
          </button>
        </label>
      </fieldset>
    </form>
  );
}

export default FiltersForm;
