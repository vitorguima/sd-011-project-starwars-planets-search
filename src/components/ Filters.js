import React, { useContext, useState } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';
// Duvida: Não estou controlando o input de pesquisa dinamica e fazendo direto a alteração do provider. Correto isso?

export default function Filter() {
  // criar uma logica melhor para filtragem das opções de coluna
  const [columnsOptions, setColumnsOptions] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  // function setComunsOptions(columnFilter) {
  //   columnsOptions = columnsOptions.filter((item) => item !== columnFilter);
  // }

  const {
    data,
    column,
    comparison,
    value,
    // filtered,
    filters,
    // setData,
    setName,
    setColumn,
    setComparison,
    setValue,
    setFiltered,
    setFilters,
  } = useContext(PlanetsContext);

  function planetByInput(target) {
    setName(target.value);
    const planetsByInput = data.filter((planet) => (
      planet.name.toLowerCase().includes(target.value)
    ));
    setFiltered(planetsByInput);
  }

  function planetsByFilters() {
    const newFilters = {
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues, { column, comparison, value }],
    };
    setColumnsOptions(columnsOptions.filter((item) => item !== column));
    setFilters(newFilters);
  }

  function removeFilter(columnFilter) {
    console.log(columnFilter);
    const newFilters = {
      ...filters,
      filterByNumericValues: filters.filterByNumericValues.filter((item) => (
        item.column !== columnFilter
      )),
    };
    setFilters(newFilters);
    setColumnsOptions(columnsOptions.concat(columnFilter));
  }

  function liFilterCreator({ filterByNumericValues }) {
    const liList = filterByNumericValues.map((filter, index) => (
      <li data-testid="filter" key={ index }>
        {`${filter.column} ${filter.comparison} ${filter.value}`}
        <button onClick={ () => removeFilter(filter.column) } type="button">X</button>
      </li>
    ));
    return liList;
  }

  return (
    <section>
      <form>
        <label htmlFor="input_Filter">
          <input
            name="input_Filter"
            id="input_Filter"
            type="text"
            onChange={ ({ target }) => planetByInput(target) }
            placeholder="Search..."
            data-testid="name-filter"
          />
        </label>

        <br />
        <span>Filtro: </span>
        <select
          name="column-filter"
          htmlFor="column-filter"
          data-testid="column-filter"
          value={ null }
          onChange={ ({ target }) => setColumn(target.value) }
        >
          {/* <option disabled selected>Selecione um valor</option> */}
          {
            columnsOptions.map(((option, index) => (
              <option key={ index }>{option}</option>
            )))
          }
        </select>

        <select
          id="comparison_filter"
          name="comparison_filter"
          data-testid="comparison-filter"
          value={ null }
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option disabled selected>Selecione um valor</option>
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>

        <input
          name="value_filter"
          id="value_filter"
          type="number"
          onChange={ ({ target }) => setValue(target.value) }
          placeholder="0"
          data-testid="value-filter"
        />
        <button
          type="button"
          onClick={ () => planetsByFilters() }
          data-testid="button-filter"
        >
          Filtrar
        </button>
      </form>
      { (filters.filterByNumericValues.length > 0)
        ? (
          <ul>
            {liFilterCreator(filters)}
          </ul>
        )
        : null }
    </section>
  );
}
