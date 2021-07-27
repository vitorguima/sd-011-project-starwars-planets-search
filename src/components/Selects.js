import React, { useContext, useState } from 'react';
import Context from '../APIcontext/Context';

function Selects() {
  const { filters, setFilters } = useContext(Context);

  // Filtro Atual para controle dos inputs do usuário
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const SendValueToGlobalHooks = () => {
    const currFilter = { column, comparison, value };
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, currFilter],
    });
  };

  return (
    <div>
      <label htmlFor="column">
        <select
          data-testid="column-filter"
          name="column"
          onChange={ ({ target }) => setColumn(target.value) }
        >
          <option key="population" value="population">population</option>
          <option key="orbital_period" value="orbital_period">orbital_period</option>
          <option key="diameter" value="diameter">diameter</option>
          <option key="rotation_period" value="rotation_period">rotation_period</option>
          <option key="surface_water" value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option key="maior que" value="maior que">maior que</option>
          <option key="menor que" value="menor que">menor que</option>
          <option key="igual a" value="igual a">igual a</option>
        </select>
      </label>
      <input
        data-testid="value-filter"
        name="value"
        type="number"
        onChange={ ({ target }) => setValue(target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ SendValueToGlobalHooks }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Selects;
