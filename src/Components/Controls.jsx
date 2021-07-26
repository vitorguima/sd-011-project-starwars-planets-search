import React, { useState } from 'react';
import { usePlanets } from '../hooks/usePlanets';

function Controls() {
  const [textFilter, setTextFilter] = useState('');
  const { addFilter } = usePlanets();
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

  function handleAddFilter({ type, content }) {
    const filters = {
      text: {
        type,
        filterFunc: ({ name }) => name.toLowerCase().includes(content.toLowerCase()),
      },
    };

    addFilter(filters[type]);
  }

  const mapSelect = (options) => options.map(({ translation, value }) => (
    <option
      key={ value }
      value={ value }
    >
      { translation }
    </option>
  ));

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

      <form>
        <fieldset>
          <legend>Filtrar por números</legend>
          <select name="numeric_field" data-testid="column-filter" required>
            { mapSelect(NUMERIC_FIELDS) }
          </select>
          <select name="" data-testid="comparison-filter" required>
            { mapSelect(COMPARE_OPTIONS) }
          </select>
          <input
            type="number"
            placeholder="30000"
            data-testid="value-filter"
            required
          />
          <button
            type="submit"
            data-testid="button-filter"
          >
            Adicionar Filtro Numérico
          </button>
        </fieldset>
      </form>
    </section>
  );
}

export default Controls;
