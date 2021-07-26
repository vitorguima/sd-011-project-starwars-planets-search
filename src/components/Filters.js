import React from 'react';
import MyContext from './MyContext';

const numbersToBeFiltered = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const comparatives = ['maior que', 'menor que', 'igual a'];

function Filters() {
  const { filters, setFilters } = React.useContext(MyContext);
  const [name, setName] = React.useState('');
  const [column, setColumn] = React.useState(numbersToBeFiltered[0]);
  const [comparison, setComparison] = React.useState(comparatives[0]);
  const [value, setValue] = React.useState(0);

  const updateFilters = (key, keyValue) => {
    setFilters({
      ...filters,
      [key]: keyValue,
    });
  };

  const handleFilters = ({ target }) => {
    setName(target.value);
    updateFilters('filterByName', { name: target.value.toLowerCase() });
  };

  const handleFiltersOptions = () => {
    const numericFilters = {
      column,
      comparison,
      value,
    };

    updateFilters('filterByNumericValues', numericFilters);
  };

  return (
    <section>
      <input
        value={ name }
        onChange={ handleFilters }
        placeholder="Planet name"
        data-testid="name-filter"
      />
      <select
        value={ column }
        onChange={ ({ target }) => setColumn(target.value) }
        data-testid="column-filter"
      >
        { numbersToBeFiltered.map((option) => <option key={ option }>{option}</option>) }
      </select>
      <select
        value={ comparison }
        onChange={ ({ target }) => setComparison(target.value) }
        data-testid="comparison-filter"
      >
        { comparatives.map((option) => <option key={ option }>{option}</option>) }
      </select>
      <input
        type="number"
        value={ value }
        onChange={ ({ target }) => setValue(target.value) }
        placeholder="0"
        data-testid="value-filter"
      />
      <button type="button" onClick={ handleFiltersOptions } data-testid="button-filter">
        Filter
      </button>
    </section>
  );
}

export default Filters;
