import React, { useState } from 'react';
import { usePlanets } from '../hooks/usePlanets';

function Controls() {
  const [textFilter, setTextFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState({
    numeric_field: 'population',
    numeric_comparison: 'gt',
    numeric_value: null,
  });
  const { addFilter, filters } = usePlanets();
  const NUMERIC_FIELDS = [
    { translation: 'População', value: 'population' },
    { translation: 'Período Orbital', value: 'orbital_period' },
    { translation: 'Diâmetro', value: 'diameter' },
    { translation: 'Período de Rotação', value: 'rotation_period' },
    { translation: 'Água na Superfície', value: 'surface_water' },
  ];

  const COMPARE_OPTIONS = [
    { translation: 'maior que', value: 'gt' },
    { translation: 'igual a', value: 'eq' },
    { translation: 'menor que', value: 'lt' },
  ];

  function handleAddFilter({ type, content, field }) {
    const filterDict = {
      text: {
        type,
        filterFunc: ({ name }) => name.toLowerCase().includes(content.toLowerCase()),
      },
      numeric_lt: {
        type: `numeric/${field}`,
        filterFunc: (planet) => planet[field] < content,
      },
      numeric_eq: {
        type: `numeric/${field}`,
        filterFunc: (planet) => planet[field] === content,
      },
      numeric_gt: {
        type: `numeric/${field}`,
        filterFunc: (planet) => planet[field] > content,
      },
    };

    addFilter(filterDict[type]);
  }

  const mapSelect = (options) => options.map(({ translation, value }) => (
    <option
      key={ value }
      value={ value }
    >
      { translation }
    </option>
  ));

  function handleChangeNumericFilter({ target }) {
    const { name, value } = target;

    setNumericFilter((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleAddNumericFilter(e) {
    e.preventDefault();

    handleAddFilter({
      type: `numeric_${numericFilter.numeric_comparison}`,
      content: numericFilter.numeric_value,
      field: numericFilter.numeric_field,
    });
  }

  return (
    <section>
      <fieldset>
        <legend>Filtrar por nome</legend>
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Insira o nome ou parte dele"
          value={ textFilter }
          onChange={ ({ target }) => {
            setTextFilter(target.value);
            handleAddFilter({ type: 'text', content: target.value });
          } }
        />
      </fieldset>

      <form
        onChange={ handleChangeNumericFilter }
        onSubmit={ handleAddNumericFilter }
      >
        <fieldset>
          <legend>Filtrar por números</legend>
          <select
            data-testid="column-filter"
            name="numeric_field"
            required
            title="Campo para ser comparado"
          >
            { mapSelect(NUMERIC_FIELDS) }
          </select>
          <select
            data-testid="comparison-filter"
            name="numeric_comparison"
            required
            title="Comparação"
          >
            { mapSelect(COMPARE_OPTIONS) }
          </select>
          <input
            data-testid="value-filter"
            name="numeric_value"
            placeholder="30000"
            required
            title="Valor para ser comparado"
            type="number"
          />
          <button
            data-testid="button-filter"
            type="submit"
          >
            Adicionar Filtro Numérico
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default Controls;
