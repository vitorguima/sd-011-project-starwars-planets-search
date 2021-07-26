import React from 'react';
// import MyContext from './MyContext';
import PropTypes from 'prop-types';

function Filter({ initstate, setInitState }) {
  function changeValue({ target }) {
    const { value } = target;
    const { data } = initstate;
    setInitState({
      ...initstate,
      newData: data.filter(({ name }) => name.includes(value)),
      filterByName: {
        name: value,
      },
    });
  }

  function sendSelect({ target }) {
    const { name, value } = target;
    setInitState({
      ...initstate,
      filterByNumericValues: {
        ...initstate.filterByNumericValues,
        [name]: value,
      },
    });
  }

  function clickFilter() {
    const { data } = initstate;
    const { column, comparison, numberValue } = initstate.filterByNumericValues;
    let newArray = [];

    if (comparison === 'maior que' || comparison === undefined) {
      newArray = data.filter((itemArray) => itemArray[column] > numberValue);
    }
    if (comparison === 'menor que') {
      newArray = data.filter((itemArray) => itemArray[column] < numberValue);
    }
    if (comparison === 'igual a') {
      newArray = data.filter((itemArray) => itemArray[column] === numberValue);
    }

    setInitState({
      ...initstate,
      newData: newArray,
    });
  }

  return (
    <form>
      <input
        type="text"
        onChange={ changeValue }
        data-testid="name-filter"
      />
      <select data-testid="column-filter" name="column" onChange={ sendSelect }>
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select data-testid="comparison-filter" name="comparison" onChange={ sendSelect }>
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        onChange={ sendSelect }
        name="numberValue"
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ clickFilter }
      >
        Filtrar
      </button>
    </form>
  );
}

export default Filter;

Filter.propTypes = {
  initstate: PropTypes.shape().isRequired,
  setInitState: PropTypes.func.isRequired,
};
