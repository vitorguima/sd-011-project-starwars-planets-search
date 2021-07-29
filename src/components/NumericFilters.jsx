import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

function NumericFilters() {
  const { filters, setFilters } = useContext(GlobalContext);
  const [colum, setColumFilter] = useState('population');
  const [comparison, setComparisonFilter] = useState('maior que');
  const [value, setValueFilter] = useState('');

  const updateNumericFilters = () => {
    const selectedfilters = {
      colum,
      comparison,
      value,
    };
    setFilters(
      { ...filters, filterByNumericValues: [selectedfilters] },
    );
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ colum }
        onChange={ (e) => setColumFilter(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        value={ comparison }
        onChange={ (e) => setComparisonFilter(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ value }
        onChange={ (e) => setValueFilter(e.target.value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ updateNumericFilters }
      >
        Filtrar
      </button>
    </div>
  );
}

export default NumericFilters;
