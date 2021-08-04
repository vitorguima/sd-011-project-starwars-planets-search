import React, { useContext, useState } from 'react';
import ContextApp from '../context/ContextApp';

const ALTERNATIVES = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function Forms() {
  const { filters, setFilter } = useContext(ContextApp);
  const [alternatives, setAlternatives] = useState(ALTERNATIVES);
  const [numberFilter, setNumberFilter] = useState({
    comparison: 'maior que',
    column: 'population',
    number: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setFilter({
      ...filters,
      [name]: { name: value.toLowerCase() },
    });
  };

  const handleClick = () => {
    setFilter({ ...filters, filterByNumericValues: [numberFilter] });
    const newAlternatives = ALTERNATIVES
      .filter((element) => numberFilter.column !== element);
    setAlternatives(newAlternatives);
  };

  const handleFilters = ({ target: { name, value } }) => {
    setNumberFilter({ ...numberFilter, [name]: value });
  };

  return (
    <header>
      <form>
        <label htmlFor="filterByName">
          Filter by name:
          <input
            name="filterByName"
            data-testId="name-filter"
            type="text"
            id="filterByName"
            onChange={ handleChange }
          />
        </label>

        <section style={ { padding: 10 } }>
          Filter by:
          <select
            name="column"
            data-testid="column-filter"
            onChange={ handleFilters }
          >
            {alternatives.map((element, index) => (
              <option key={ index } value={ element }>{ element }</option>
            ))}
          </select>

          <select
            name="comparison"
            data-testid="comparison-filter"
            onChange={ handleFilters }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>

          <label htmlFor="filterByName">
            Filter value:
            <input
              data-testid="value-filter"
              name="number"
              type="number"
              onChange={ handleFilters }
            />
          </label>
          <button
            data-testid="button-filter"
            type="button"
            disabled={ (!numberFilter.comparison
              || !numberFilter.column
              || !numberFilter.number) }
            onClick={ handleClick }
          >
            Filter
          </button>
        </section>
      </form>
    </header>
  );
}

export default Forms;
