import React, { useContext, useState, createRef } from 'react';
import StarContext from '../context/StarContext';

function Filter() {
  const [sort, setSort] = useState({});
  const {
    setFilterByName,
    setFilterByValue,
    setOrder,
    filters: { filterByValue },
  } = useContext(StarContext);

  const filterColumn = createRef();
  const filterComparison = createRef();
  const filterValue = createRef();

  const filterList = () => {
    setFilterByValue([
      ...filterByValue,
      {
        column: filterColumn.current.value,
        comparison: filterComparison.current.value,
        value: parseFloat(filterValue.current.value),
      },
    ]);
  };

  const filterAlreadyUsed = (filterType, option) => filterByValue
    .find((filter) => filter[filterType] === option);

  const renderFilterOptions = () => {
    const options = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ];
    const filteredOptions = options.filter(
      (option) => !filterAlreadyUsed('column', option),
    );
    return filteredOptions.map((filteredOption, index) => (
      <option key={ index } value={ filteredOption }>
        {filteredOption}
      </option>
    ));
  };
  const renderSortOptions = () => {
    const options = [
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
      'name',
    ];

    return options.map((filteredOption) => (
      <option key={ filteredOption } value={ filteredOption }>
        {filteredOption}
      </option>
    ));
  };

  const removeFilter = (filter) => {
    const filterToRemove = filterByValue.filter(({ column }) => column !== filter);
    setFilterByValue(filterToRemove);
  };

  const renderUsedFilterList = () => {
    if (filterByValue.length === 0) return;
    return filterByValue.map((filter) => {
      const { column, comparison, value } = filter;
      return (
        <p key={ column } data-testid="filter">
          {`${column} ${comparison} ${value}`}
          <button
            id={ column }
            type="button"
            onClick={ ({ target }) => {
              removeFilter(target.id);
            } }
          >
            Remove
          </button>
        </p>
      );
    });
  };

  return (
    <>
      <div className="filterByName">
        <label htmlFor="filterByName">
          Name
          <input
            id="filterByName"
            data-testid="name-filter"
            type="text"
            onChange={ ({ target: { value } }) => {
              setFilterByName(value);
            } }
          />
        </label>
      </div>
      <div className="filterByValue">
        <label htmlFor="filterColumn">
          Column
          <select
            id="filterColumn"
            ref={ filterColumn }
            data-testid="column-filter"
          >
            {renderFilterOptions()}
          </select>
        </label>

        <label htmlFor="filterComparison">
          Comparison
          <select
            id="filterComparison"
            ref={ filterComparison }
            data-testid="comparison-filter"
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>

        <label htmlFor="filterValue">
          Value
          <input
            id="filterValue"
            ref={ filterValue }
            data-testid="value-filter"
            type="number"
          />
        </label>
        <button onClick={ filterList } type="button" data-testid="button-filter">
          Search
        </button>
      </div>

      <div className="sort">
        <label htmlFor="sortColumn">
          Sort
          <select
            id="sortColumn"
            onChange={ ({ target }) => { setSort({ ...sort, column: target.value }); } }
            data-testid="column-sort"
          >
            <option hidden> </option>
            {renderSortOptions()}
          </select>
        </label>
        <div
          className="radioChange"
          onChange={ ({ target }) => {
            setSort({ ...sort, sort: target.value });
          } }
        >
          <label htmlFor="sortWay">
            ascendente
            <input
              type="radio"
              name="sortWay"
              id="sortAsc"
              value="ASC"
              data-testid="column-sort-input-asc"
            />
          </label>
          <label htmlFor="sortWay">
            descendente
            <input
              type="radio"
              name="sortWay"
              id="sortDesc"
              value="DESC"
              data-testid="column-sort-input-desc"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={ () => {
            if (Object.keys(sort).length === 2) setOrder(sort);
          } }
          data-testid="column-sort-button"
        >
          Sort
        </button>
      </div>
      <div>{renderUsedFilterList()}</div>
    </>
  );
}

export default Filter;
