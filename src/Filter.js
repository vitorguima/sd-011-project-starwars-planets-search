import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Filter({ initstate, setInitState }) {
  const [valueFilter, setValueFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    numberValue: '100000',
  });
  const [updateFilter, setupdateFilter] = useState(false);
  const [colunFiltr, setColunFiltr] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [comparationFiltr, setcomparationFiltr] = useState(
    ['maior que', 'menor que', 'igual a'],
  );

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
    setValueFilter({
      ...valueFilter,
      [name]: value,
    });
  }

  function clickFilter(column, comparison) {
    const { filterByNumericValues } = initstate;
    setInitState({
      ...initstate,
      filterByNumericValues: [
        ...filterByNumericValues,
        valueFilter,
      ],
    });
    setColunFiltr(colunFiltr.filter((item) => item !== column));
    setcomparationFiltr(comparationFiltr.filter((item) => item !== comparison));
    setupdateFilter(true);
  }

  useEffect(() => {
    const { data, filterByNumericValues } = initstate;
    const newItemFilter = filterByNumericValues.length - 1;

    if (updateFilter) {
      const {
        column,
        comparison,
        numberValue,
      } = filterByNumericValues[newItemFilter];

      let newArray = [];
      if (comparison === 'menor que') {
        newArray = data.filter((itemArray) => (
          itemArray[column] < numberValue || itemArray[column] === 'unknown'));
      }
      if (comparison === 'maior que') {
        newArray = data.filter((itemArray) => (
          Number(itemArray[column]) > Number(numberValue)));
      }
      if (comparison === 'igual a') {
        newArray = data.filter((itemArray) => itemArray[column] === numberValue);
      }
      setInitState({
        ...initstate,
        newData: newArray,
      });
      setupdateFilter(false);
    }
  }, [initstate, setInitState, updateFilter]);

  return (
    <form>
      <input
        type="text"
        onChange={ changeValue }
        data-testid="name-filter"
      />
      <select data-testid="column-filter" name="column" onChange={ sendSelect }>
        { colunFiltr.map((colunItem, index) => (

          <option key={ index } value={ colunItem }>{ colunItem }</option>

        )) }
      </select>
      <select data-testid="comparison-filter" name="comparison" onChange={ sendSelect }>
        { comparationFiltr.map((comparisonItem, index) => (

          <option key={ index } value={ comparisonItem }>{ comparisonItem }</option>

        )) }
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
        onClick={ () => clickFilter(valueFilter.column, valueFilter.comparison) }
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
