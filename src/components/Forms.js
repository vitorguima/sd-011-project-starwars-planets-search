import React, { useContext, useState, useEffect } from 'react';
import ContextApp from '../context/ContextApp';

function Forms() {
  const { filters, setFilter } = useContext(ContextApp);
  const [FilterBtn, setFilterBtn] = useState(false);
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
  };

  const handleFilters = ({ target: { name, value } }) => {
    setNumberFilter({ ...numberFilter, [name]: value });
  };

  const handlefilterBtn = () => {
    const { comparison, column, number } = numberFilter;
    if (!comparison || !column || !number) setFilterBtn(false);
    else setFilterBtn(true);
  };

  useEffect(() => {
    handlefilterBtn();
  });

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
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
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
            disabled={ !FilterBtn }
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
