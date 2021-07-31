import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const FilterInputs = () => {
  const { filters, setFilters } = useContext(PlanetsContext);
  const { filterByNumericValues } = filters;
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState('');

  const getOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const filterArrayOptionsColumn = getOptions.filter((option) => (
    !filterByNumericValues.map((item) => item.column).includes(option)
  ));

  const handleBtnFilterClick = () => {
    setFilters({ ...filters,
      filterByNumericValues: [...filters
        .filterByNumericValues, { column, comparison, value }] });
  };

  return (
    <div>
      <div>
        <label htmlFor="filter-name">
          Planet name
          {' '}
          <input
            type="text"
            name="filter-name"
            data-testid="name-filter"
            onChange={ ({ target }) => setFilters({
              ...filters, filterByName: { name: target.value },
            }) }
          />
        </label>
      </div>
      <div>
        <label htmlFor="label-select">
          Select filter
          {' '}
          <select
            name="label-select"
            data-testid="column-filter"
            onChange={ ({ target }) => setColumn(target.value) }
          >
            {
              filterArrayOptionsColumn.map((item, index) => (
                <option
                  key={ index }
                  name={ item }
                >
                  {item}
                </option>
              ))
            }
          </select>
          <select
            data-testid="comparison-filter"
            onChange={ ({ target }) => setComparison(target.value) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
          <input
            type="number"
            data-testid="value-filter"
            onChange={ ({ target }) => setValue(target.value) }
          />
          <button
            data-testid="button-filter"
            type="button"
            onClick={ () => handleBtnFilterClick() }
          >
            Filter
          </button>
        </label>
      </div>
    </div>
  );
};

export default FilterInputs;
