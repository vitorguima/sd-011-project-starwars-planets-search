import React, { useContext, useRef } from 'react';
import AppContext from '../Context';

const initialValue = <div>initialValue</div>;

export default function SearchByNumber() {
  const { data, setList } = useContext(AppContext);
  const columnFilter = useRef(initialValue);
  const comparisonFilter = useRef(initialValue);
  const valueFilter = useRef(initialValue);

  function filterFunc() {
    const list = data.reduce((acc, cur) => {
      const value = parseInt(cur[columnFilter.current.value], 10);
      const filterValue = parseInt(valueFilter.current.value, 10);
      switch (comparisonFilter.current.value) {
      case 'maior que':
        return (value > filterValue) ? (
          [...acc, cur]
        ) : (
          acc
        );
      case 'menor que':
        return (value < filterValue) ? (
          [...acc, cur]
        ) : (
          acc
        );
      case 'igual a':
        return (value === filterValue) ? (
          [...acc, cur]
        ) : (
          acc
        );
      default:
        return [...acc, cur];
      }
    }, []);
    setList(list);
  }

  return (
    <div>
      <select data-testid="column-filter" ref={ columnFilter }>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
        onClick={ () => filterFunc() }
      >
        Adicionar
      </button>
    </div>
  );
}
