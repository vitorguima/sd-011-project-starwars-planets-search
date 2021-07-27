import React from 'react';
import Context from '../../utils/Context';
import style from './style.module.css';

const numericOptions = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];
const comparisonOptions = ['maior que', 'menor que', 'igual a'];
const columnOptions = [
  'name', 'population', 'diameter', 'surface_water', 'climate', 'terrain', 'gravity',
  'orbital_period', 'rotation_period', 'url', 'films', 'created', 'edited',
];

function Filters() {
  const { filters, setFilters } = React.useContext(Context);
  const [name, setName] = React.useState('');
  const [column, setColumn] = React.useState(numericOptions[0]);
  const [comparison, setComparison] = React.useState(comparisonOptions[0]);
  const [value, setValue] = React.useState(0);
  const [numericFilters, setNumericFilters] = React.useState([]);
  const [actualNumericOptions, setActualNumericOptions] = React.useState(numericOptions);
  const [orderColumn, setOrderColumn] = React.useState(columnOptions[0]);
  const [sort, setSort] = React.useState('ASC');

  React.useEffect(() => {
    setActualNumericOptions(
      numericOptions.filter((option) => !numericFilters.includes(option)),
    );
  }, [numericFilters]);

  React.useEffect(() => {
    setNumericFilters(filters.filterByNumericValues.map((filter) => filter.column));
  }, [filters]);

  React.useEffect(() => {
    setColumn(actualNumericOptions[0]);
  }, [actualNumericOptions]);

  const handleNameFilterChange = ({ target }) => {
    setName(target.value);
    setFilters({
      ...filters,
      filterByName: {
        name: target.value.toLowerCase(),
      },
    });
  };

  const handleFilters = () => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        ...filters.filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    });
  };

  const handleOrderColumnChange = ({ target }) => {
    setOrderColumn(target.value);
  };

  const handleSortRadioChange = ({ target }) => {
    setSort(target.value);
  };

  const handleSortClick = () => {
    setFilters({
      ...filters,
      order: {
        column: orderColumn,
        sort,
      },
    });
  };

  return (
    <section className={ style.container }>
      <section>
        <input
          className={ style.input }
          value={ name }
          onChange={ handleNameFilterChange }
          placeholder="Enter planet name..."
          data-testid="name-filter"
        />
      </section>
      <section className={ style.formControl }>
        <select
          className={ style.input }
          value={ column }
          onChange={ ({ target }) => setColumn(target.value) }
          data-testid="column-filter"
        >
          {
            actualNumericOptions
              .filter((option) => !numericFilters.includes(option))
              .map((option) => <option key={ option }>{option}</option>)
          }
        </select>
        <select
          className={ style.input }
          value={ comparison }
          onChange={ ({ target }) => setComparison(target.value) }
          data-testid="comparison-filter"
        >
          { comparisonOptions.map((option) => <option key={ option }>{option}</option>) }
        </select>
        <input
          className={ style.input }
          type="number"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
          placeholder="0"
          data-testid="value-filter"
        />
        <button
          className={ style.button }
          type="button"
          onClick={ handleFilters }
          data-testid="button-filter"
        >
          Filter
        </button>
      </section>
      <section className={ style.formControl }>
        <select
          className={ style.input }
          value={ orderColumn }
          onChange={ handleOrderColumnChange }
          data-testid="column-sort"
        >
          {
            columnOptions.map((option) => <option key={ option }>{option}</option>)
          }
        </select>
        <section className={ style.radioControl }>
          <label className={ style.label } htmlFor="asc">
            <input
              type="radio"
              id="asc"
              name="sort"
              value="ASC"
              checked={ sort === 'ASC' }
              onChange={ handleSortRadioChange }
              data-testid="column-sort-input-asc"
            />
            ASC
          </label>
          <label className={ style.label } htmlFor="desc">
            <input
              type="radio"
              id="desc"
              name="sort"
              value="DESC"
              checked={ sort === 'DESC' }
              onChange={ handleSortRadioChange }
              data-testid="column-sort-input-desc"
            />
            DESC
          </label>
        </section>
        <button
          className={ style.button }
          type="button"
          onClick={ handleSortClick }
          data-testid="column-sort-button"
        >
          Sort
        </button>
      </section>
    </section>
  );
}

export default Filters;
