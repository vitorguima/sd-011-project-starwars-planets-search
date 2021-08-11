import React, { useContext, useState, useEffect } from 'react';
import MainContext from '../context/MainContext';
import FiltersChoised from './FiltersChoised';
import sortNumbers from '../helpers/functionsFitlers';

const listComparison = [
  'maior que',
  'menor que',
  'igual a',
];

function PlanetsFilter() {
  const {
    filters,
    listFilter,
    filteredData,
    sets: { setOrder, setFilters, setFilteredData } } = useContext(MainContext);

  const [listFilterChoise, setListFilterChoise] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [orderColumn, setOrderColumn] = useState('name');
  const [orderRadios, setOrderRadios] = useState('ASC');
  const orderColumnOptions = [
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
    'films',
    'created',
    'edited',
    'url'];

  function handleNumericChange() {
    listFilter.splice(listFilter.indexOf(listFilterChoise) || 0, 1);
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column: listFilterChoise,
          comparison: comparisonFilter,
          value: valueFilter,
        },
      ],
    });
    setListFilterChoise(listFilter[0]);
  }

  useEffect(() => {
    sortNumbers(
      { column: orderColumn, sort: orderRadios },
      filteredData,
      setFilteredData,
    );
  }, [filteredData, orderColumn, orderRadios, setFilteredData]);

  function handleOrder() {
    setOrder({
      column: orderColumn,
      sort: orderRadios,
    });
    sortNumbers(
      { column: orderColumn, sort: orderRadios },
      filteredData,
      setFilteredData,
    );
  }

  return (
    <section>
      <form>
        <fieldset>
          <legend>Filtrar</legend>
          <label htmlFor="name-filter">
            Nome:
            <input
              id="name-filter"
              data-testid="name-filter"
              placeholder="Tatooine"
              onChange={
                ({ target: { value } }) => setFilters({
                  ...filters,
                  filterByName: { name: value },
                })
              }
            />
          </label>
          <p>Valores numéricos:</p>
          <label htmlFor="column-filter">
            Filtro:
            <select
              data-testid="column-filter"
              id="column-filter"
              onChange={ ({ target: { value } }) => setListFilterChoise(value) }
              value={ listFilterChoise }
            >
              { listFilter.map((filter) => <option key={ filter }>{filter}</option>)}
            </select>
          </label>
          <label htmlFor="comparison-filter">
            Faixa de valor:
            <select
              data-testid="comparison-filter"
              id="comparison-filter"
              value={ comparisonFilter }
              onChange={ ({ target: { value } }) => setComparisonFilter(value) }
            >
              { listComparison.map((comparison) => (
                <option key={ comparison }>{comparison}</option>
              ))}
            </select>
          </label>
          <label htmlFor="value-filter">
            Valor:
            <input
              id="value-filter"
              data-testid="value-filter"
              type="number"
              onChange={ ({ target: { value } }) => setValueFilter(value) }
              value={ valueFilter }
            />
          </label>
          <button
            type="button"
            onClick={ handleNumericChange }
            data-testid="button-filter"
          >
            Filtrar por valor
          </button>
        </fieldset>
        <fieldset>
          <legend>Ordenar Tabela</legend>
          <label htmlFor="column-sort">
            Coluna:
            <select
              data-testid="column-sort"
              id="column-sort"
              onChange={ ({ target: { value } }) => setOrderColumn(value) }
            >
              {orderColumnOptions.map((camp) => (
                <option key={ camp }>{camp}</option>))}
            </select>
          </label>
          <p>Ordenação:</p>
          <label htmlFor="column-sort-input-asc">
            Ascendente
            <input
              data-testid="column-sort-input-asc"
              id="column-sort-input-asc"
              name="column-sort-input"
              onClick={ () => setOrderRadios('ASC') }
              type="radio"
              value="ASC"
            />
          </label>
          <label htmlFor="column-sort-input-desc">
            Descendente
            <input
              data-testid="column-sort-input-desc"
              id="column-sort-input-desc"
              name="column-sort-input"
              onClick={ () => setOrderRadios('DESC') }
              type="radio"
              value="DESC"
            />
          </label>
          <button
            data-testid="column-sort-button"
            onClick={ handleOrder }
            type="button"
          >
            Ordenar
          </button>
        </fieldset>
      </form>
      <FiltersChoised />
    </section>
  );
}

export default PlanetsFilter;
