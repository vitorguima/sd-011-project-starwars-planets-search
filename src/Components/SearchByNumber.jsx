import React, { useContext, useRef, useState } from 'react';
import AppContext from '../Context';

const initialValue = <div>initialValue</div>;
const initialColumns = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function SearchByNumber() {
  const [columns, setColumns] = useState(initialColumns);
  const { filters, setFilter } = useContext(AppContext);
  const columnFilter = useRef(initialValue);
  const comparisonFilter = useRef(initialValue);
  const valueFilter = useRef(initialValue);

  function setNewFilter(obj) {
    setFilter([...filters, obj]);
    const newColumns = columns.reduce((acc, cur) => {
      if (cur === obj.column) {
        return acc;
      }
      return [...acc, cur];
    }, []);
    setColumns(newColumns);
  }

  function removeFilter(column) {
    setColumns([...columns, column]);
    const newFilters = filters.filter((element) => element.column !== column);
    setFilter(newFilters);
  }

  return (
    <div>
      {
        (filters.length > 0) && (
          filters.map(({ column, comparison, value }, index) => (
            <div key={ index } data-testid="filter">
              {`${column}--${comparison}--${value}`}
              <button
                type="button"
                data-testid="'button-filter"
                onClick={ () => removeFilter(column) }
              >
                X
              </button>
            </div>
          ))
        )
      }
      <select data-testid="column-filter" ref={ columnFilter }>
        { columns.map((element, index) => (
          <option value={ element } key={ index }>{ element }</option>
        )) }
      </select>
      <select data-testid="comparison-filter" ref={ comparisonFilter }>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input type="number" data-testid="value-filter" ref={ valueFilter } />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => setNewFilter({
          column: columnFilter.current.value,
          comparison: comparisonFilter.current.value,
          value: valueFilter.current.value,
        }) }
      >
        Adicionar
      </button>
    </div>
  );
}
