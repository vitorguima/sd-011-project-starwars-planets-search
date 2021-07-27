import React, { useState, useEffect } from 'react';
import { usePlanets } from '../hooks/usePlanets';

const NUMERIC_FIELDS = [
  { translation: 'population', value: 'population' },
  { translation: 'orbital_period', value: 'orbital_period' },
  { translation: 'diameter', value: 'diameter' },
  { translation: 'rotation_period', value: 'rotation_period' },
  { translation: 'surface_water', value: 'surface_water' },
];

// const NUMERIC_FIELDS_HOW_IT_SHOULD_HAVE_BEEN = [
//   { translation: 'População', value: 'population' },
//   { translation: 'Período Orbital', value: 'orbital_period' },
//   { translation: 'Diâmetro', value: 'diameter' },
//   { translation: 'Período de Rotação', value: 'rotation_period' },
//   { translation: 'Água na Superfície', value: 'surface_water' },
// ];

function Controls() {
  const [textFilter, setTextFilter] = useState('');
  const [numericFilter, setNumericFilter] = useState({
    numeric_field: 'population',
    numeric_comparison: 'maior que',
    numeric_value: '',
  });
  const { addFilter, filters } = usePlanets();

  const [availableNumericFilters, setAvailableNumericFilters] = useState([]);

  const COMPARE_OPTIONS = [
    { translation: 'maior que', value: 'maior que' },
    { translation: 'igual a', value: 'igual a' },
    { translation: 'menor que', value: 'menor que' },
  ];

  useEffect(() => {
    const usedFilters = filters.filter(({ type }) => type.includes('numeric'));
    const availableFilters = NUMERIC_FIELDS.filter((numFilter) => {
      for (let i = 0; i < usedFilters.length; i += 1) {
        const filterType = usedFilters[i].type.split('/')[1];
        if (numFilter.value.includes(filterType)) {
          return false;
        }
      }
      return true;
    });
    setAvailableNumericFilters(availableFilters);
    setNumericFilter({
      numeric_field: availableFilters[0].value,
      numeric_comparison: 'maior que',
      value: '',
    });
  }, [filters]);

  function handleAddFilter({ type, content, field }) {
    const filterDict = {
      text: {
        type,
        filterFunc: ({ name }) => name.toLowerCase().includes(content.toLowerCase()),
      },
      numeric_menor: {
        type: `numeric/${field}`,
        filterFunc: (planet) => planet[field] < content || planet[field] === 'unknown',
      },
      numeric_igual: {
        type: `numeric/${field}`,
        filterFunc: (planet) => planet[field] === content || planet[field] === 'unknown',
      },
      numeric_maior: {
        type: `numeric/${field}`,
        filterFunc: (planet) => planet[field] > content || planet[field] === 'unknown',
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
      type: `numeric_${numericFilter.numeric_comparison.split(' ')[0]}`,
      content: parseInt(numericFilter.numeric_value, 10),
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
        onSubmit={ handleAddNumericFilter }
      >
        <fieldset>
          <legend>Filtrar por números</legend>
          <select
            data-testid="column-filter"
            name="numeric_field"
            onChange={ handleChangeNumericFilter }
            required
            title="Campo para ser comparado"
            value={ numericFilter.numeric_field }
          >
            { mapSelect(availableNumericFilters) }
          </select>
          <select
            data-testid="comparison-filter"
            name="numeric_comparison"
            onChange={ handleChangeNumericFilter }
            required
            title="Comparação"
            value={ numericFilter.numeric_comparison }
          >
            { mapSelect(COMPARE_OPTIONS) }
          </select>
          <input
            data-testid="value-filter"
            name="numeric_value"
            placeholder="30000"
            onChange={ handleChangeNumericFilter }
            required
            title="Valor para ser comparado"
            type="number"
            value={ numericFilter.numeric_value || '' }
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
