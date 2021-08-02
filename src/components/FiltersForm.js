import React, { useState, useContext, useEffect } from 'react';
import PlanetsContext from '../contexts/PlanetsContext';

function FiltersForm() {
  const { filters, setFilters } = useContext(PlanetsContext);
  const { filterByName: { name }, filterByNumericValues } = filters;
  const [othersFilter, setOthersFilter] = useState(
    {
      column: '',
      comparison: '',
      value: '',
    },
  );

  function changeNameFilter({ target }) { // Controla o campos de <FiltersForm /> com App.js via Contexto
    const { value } = target;
    setFilters({
      ...filters,
      filterByName: { name: value },
    });
  }

  // "userEffect" ABAIXO pra testar componentes controlados

  useEffect(() => {
    console.log('Abaixo o componente controlado do filter');
    console.log(othersFilter);
  }, [othersFilter]);

  // START "By Others" >>>

  function changeGenericFilter({ target }) { // Controla o campos de <FiltersForm /> com App.js via Contexto
    const { value, name: targetName } = target;
    setOthersFilter({
      ...othersFilter,
      [targetName]: value,
    });
  }

  // <<< END "By Others"

  function clickNumberFilter() { // Controla o campos de <FiltersForm /> com App.js via Contexto
    setFilters({
      ...filters,
      filterByNumericValues: [...filterByNumericValues, othersFilter],
    });
  }

  function renderOthersFilter() {
    return (
      <fieldset>
        <legend>
          <h4> By Others </h4>
        </legend>
        <select
          id="columnFilter"
          data-testid="column-filter"
          name="column"
          onChange={ (ev) => changeGenericFilter(ev) }
        >

          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        &nbsp;  &nbsp;
        <select
          id="comparisonFilter"
          data-testid="comparison-filter"
          name="comparison"
          onChange={ (ev) => changeGenericFilter(ev) }
        >
          <option value="=">igual a</option>
          <option value=">">maior que</option>
          <option value="<">menor que</option>
        </select>
        &nbsp;  &nbsp;
        <input
          placeholder="value"
          type="number"
          data-testid="value-filter"
          name="value"
          id="valueFilter"
          onChange={ (ev) => changeGenericFilter(ev) }
        />
      &nbsp;  &nbsp;
        <button
          data-testid="button-filter"
          type="button"
          onClick={ () => clickNumberFilter() }
        >
          Adicionar Filter
        </button>
      </fieldset>
    );
  }

  return (
    <div>
      <form data-testid="search-bar-form">
        <fieldset>
          <legend><h2>Filtros de Busca</h2></legend>
          <label htmlFor="text-input">
            By Name: &nbsp;
            <input
              type="text"
              data-testid="name-filter"
              name="filterByName"
              id="text-input"
              value={ name }
              onChange={ (ev) => changeNameFilter(ev) }
            />
          </label>
          &nbsp;  &nbsp;  &nbsp; &nbsp;  &nbsp;  &nbsp;
          {renderOthersFilter()}
        </fieldset>
      </form>
      <br />
    </div>
  );
}

export default FiltersForm;
