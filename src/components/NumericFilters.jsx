import React, { useContext, useState } from 'react';
import GlobalContext from '../context/GlobalContext';

function NumericFilters() {
  const { filters, setFilters } = useContext(GlobalContext);
  const [colum, setColumFilter] = useState('population');
  const [comparison, setComparisonFilter] = useState('maior que');
  const [value, setValueFilter] = useState('');
  const [columOptions, setColumOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const updateNumericFilters = () => {
    const selectedfilters = {
      colum,
      comparison,
      value,
    };
    setFilters(
      { ...filters, filterByNumericValues: [selectedfilters] },
    );
    const availableColumns = columOptions.filter((item) => item !== colum);
    setColumOptions([...availableColumns]);
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        value={ colum }
        onChange={ (e) => setColumFilter(e.target.value) }
      >
        {columOptions.map((item, index) => (
          <option key={ index } value={ item }>{ item }</option>
        ))}
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
