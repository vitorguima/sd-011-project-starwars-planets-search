import React, { useState, useContext } from 'react';
import DataContext from '../context/DataContext';

function NumFilter() {
  const [select1, setSelect1] = useState('');
  const [select2, setSelect2] = useState('');
  const [input, setInput] = useState('');
  const { data, setFiltered } = useContext(DataContext);

  function handleClick() {
    let newData;
    switch (select2) {
    case 'maior que':
      newData = data.filter((planet) => parseInt(planet[(select1)], 10) > input);
      setFiltered(newData);
      break;
    case 'menor que':
      newData = data.filter((planet) => parseInt(planet[(select1)], 10) < input);
      setFiltered(newData);
      break;
    case 'igual a':
      newData = data.filter((planet) => parseInt(planet[(select1)], 10) === input);
      setFiltered(newData);
      break;
    default:
    }
  }

  return (
    <form>
      <select
        id="column-filter"
        data-testid="column-filter"
        value={ select1 }
        onChange={ ({ target }) => setSelect1(target.value) }
      >
        <option value="" defaultValue disabled hidden>Select Column</option>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        id="comparison-filter"
        data-testid="comparison-filter"
        value={ select2 }
        onChange={ ({ target }) => setSelect2(target.value) }
      >
        <option value="" defaultValue disabled hidden>Comparision</option>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        id="value-filter"
        data-testid="value-filter"
        type="number"
        value={ input }
        onChange={ ({ target }) => setInput(parseInt(target.value, 10)) }
        placeholder="threshold"
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        Filter
      </button>
    </form>
  );
}

export default NumFilter;
