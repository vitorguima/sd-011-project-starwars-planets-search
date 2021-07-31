import React, { useContext, useState } from 'react';
import Context from '../APIcontext/Context';

function Selects() {
  const { filters, setFilters, listColumns, setListColumns,
    filteredPlanets, setFilteredPlanets, columns, setColumns } = useContext(Context);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [currOrder, setOrder] = useState('ASC');
  const [currOption, setCurrOption] = useState('name');

  const SendValueToGlobalHooks = () => {
    setColumns([...columns, ...columns.splice(columns.indexOf(column), 1)]);
    setColumns(columns);
    setColumn(columns[0]);
    console.log(columns);
    setListColumns([...listColumns, column]);
    const currFilter = { column, comparison, value };
    setFilters({
      ...filters,
      filterByNumericValues: [...filters.filterByNumericValues, currFilter],
    });
  };

  const handleChangeOption = (target) => {
    setCurrOption(target.value);
  };

  const handleInputChange = (target) => {
    setOrder(target.value);
  };

  const orderByNumeric = (column, sort) => {
    if (sort === 'ASC') {
      (filteredPlanets.sort((a, b) => {
        const inversion = -1;
        if (+a[column] > +b[column]) return 1;
        if (+a[column] < +b[column]) return inversion;
        return 0;
      }));
    } else {
      (filteredPlanets.sort((a, b) => {
        const inversion = -1;
        if (+a[column] < +b[column]) return 1;
        if (+a[column] > +b[column]) return inversion;
        return 0;
      }));
    }
    setFilteredPlanets(filteredPlanets);
  };

  const orderByTextual = (column, sort) => {
    if (sort === 'ASC') {
      (filteredPlanets.sort((a, b) => {
        const inversion = -1;
        if (a[column] > b[column]) return 1;
        if (a[column] < b[column]) return inversion;
        return 0;
      }));
    } else {
      (filteredPlanets.sort((a, b) => {
        const inversion = -1;
        if (a[column] < b[column]) return 1;
        if (a[column] > b[column]) return inversion;
        return 0;
      }));
    }
    setFilteredPlanets(filteredPlanets);
  };

  const setFilter = () => {
    setFilters({
      ...filters,
      order: { name: currOption, order: currOrder },
    });
    if (currOption === 'rotation_period'
      || currOption === 'diameter'
      || currOption === 'population'
      || currOption === 'orbital_period'
      || currOption === 'surface_water') {
      orderByNumeric(currOption, currOrder);
    } else {
      orderByTextual(currOption, currOrder);
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="column">
          <select
            data-testid="column-filter"
            name="column"
            onChange={ ({ target }) => setColumn(target.value) }
          >
            {columns.map((column) => (
              <option
                key={ column }
                value={ column }
              >
                {column}
              </option>
            ))}
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
      <div>
        <label htmlFor="order">
          <select
            onChange={ ({ target }) => handleChangeOption(target) }
            data-testid="column-sort"
            name="order"
            aria-label="coluna"
          >
            {filteredPlanets.length > 0
              ? Object.keys(filteredPlanets[0]).map((coluna) => (
                <option key={ coluna } value={ coluna }>{coluna}</option>
              )) : <option disabled>Empty</option> }
          </select>
        </label>
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="order"
          value="ASC"
          onChange={ ({ target }) => handleInputChange(target) }
        />
        ASCENDENTE
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          name="order"
          value="DESC"
          onChange={ ({ target }) => handleInputChange(target) }
        />
        DESCENDENTE
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ setFilter }
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default Selects;
