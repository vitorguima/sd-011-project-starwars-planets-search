import React, { useState, useContext, useEffect } from 'react';

import PlanetsContext from '../Context/PlanetsContext';

function RadioFilter() {
  const { setFilterSort,
    setFiltered, filtered } = useContext(PlanetsContext);
  const [columns] = useState(['name', 'population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [sort, setSort] = useState('ASC');
  const [column, setColumn] = useState('name');

  const filterByName = (sorter, columnum) => {
    if (sorter === 'ASC') {
      (filtered.sort((a, b) => {
        const Minus = -1;
        if (a[columnum] > b[columnum]) return 1;
        if (a[columnum] < b[columnum]) return Minus;
        return 0;
      }));
    } else {
      (filtered.sort((a, b) => {
        const Minus = -1;
        if (a[columnum] < b[columnum]) return 1;
        if (a[columnum] > b[columnum]) return Minus;
        return 0;
      }));
    }
    setFiltered(filtered);
  };

  const filterByNumber = (sorter, columnum) => {
    if (sorter === 'ASC') {
      (filtered.sort((a, b) => {
        const Minus = -1;
        if (+a[columnum] > +b[columnum]) return 1;
        if (+a[columnum] < +b[columnum]) return Minus;
        return 0;
      }));
    } else {
      (filtered.sort((a, b) => {
        const Minus = -1;
        if (+a[column] < +b[column]) return 1;
        if (+a[column] > +b[column]) return Minus;
        return 0;
      }));
    }
    setFiltered(filtered);
  };

  const setFilter = () => {
    // const { column, sort } = order;
    if (column === 'orbital_period') {
      filterByNumber(sort, column);
      setFilterSort({ column, sort });
    } else {
      filterByName(sort, column);
      setFilterSort({ column, sort });
    }
  };

  useEffect(setFilter, []);
  useEffect(setFilter, [filtered]);

  return (
    <>
      <br />

      <label htmlFor="columns">
        <select
          name="columns"
          id="column"
          data-testid="column-sort"
          onChange={ ({ target }) => {
            setColumn(target.value);
          } }
        >
          {columns.map((col, idx) => (
            <option
              key={ idx }
              value={ col }
            >
              {col}
            </option>
          ))}
        </select>
      </label>
      <br />
      <div>
        <label htmlFor="sortWay">
          ascendente
          <input
            type="radio"
            name="sortWay"
            id="sortAsc"
            value="ASC"
            onClick={ ({ target }) => {
              setSort(target.value);
            } }
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
            onClick={ ({ target }) => {
              setSort(target.value);
            } }
            data-testid="column-sort-input-desc"
          />
        </label>
      </div>
      <br />
      <button
        type="button"
        onClick={ setFilter }
        data-testid="column-sort-button"
      >
        Ordenar
      </button>
    </>
  );
}

export default RadioFilter;
