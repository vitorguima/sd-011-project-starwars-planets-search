import React, { useState } from 'react';
import { usePlanets } from '../hooks/usePlanets';

function Controls() {
  const [textFilter, setTextFilter] = useState('');
  const { addFilter } = usePlanets();

  function handleAddFilter({ type, content }) {
    const filters = {
      text: {
        type,
        filterFunc: ({ name }) => name.toLowerCase().includes(content.toLowerCase()),
      },
    };

    addFilter(filters[type]);
  }

  return (
    <section>
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          handleAddFilter({ type: 'text' });
        } }
      >
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Filtrar por nome"
          value={ textFilter }
          onChange={ ({ target }) => {
            setTextFilter(target.value);
            handleAddFilter({ type: 'text', content: target.value });
          } }
        />

        <button type="submit">Adicionar filtro de texto</button>
      </form>
    </section>
  );
}

export default Controls;
