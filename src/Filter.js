import React, { useState, useEffect, useContext } from 'react';
import Order from './Order';
import MyContext from './MyContext';

function Filter() {
  const { initstate, setInitState } = useContext(MyContext);
  const { data, colunFilter, comparisonFilter,
    filterByNumericValues, updateFilter } = initstate;

  const [valueFilter, setValueFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    numberValue: '',
  });

  function changeValue({ target }) {
    const { value } = target;
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

  function clickFilter(column) {
    setInitState({
      ...initstate,
      colunFilter: colunFilter.filter((item) => item !== column),
      updateFilter: true,
      filterByNumericValues: [
        ...filterByNumericValues,
        valueFilter,
      ],
    });
  }

  useEffect(() => {
    if (updateFilter) {
      const newItemFilter = filterByNumericValues.length - 1;
      let newArray = [];
      const idArray = -1;
      if (newItemFilter !== idArray) {
        const {
          column,
          comparison,
          numberValue,
        } = filterByNumericValues[newItemFilter];

        if (comparison === 'menor que') {
          newArray = data.filter((itemArray) => (
            Number(itemArray[column]) < numberValue));
        }
        if (comparison === 'maior que') {
          newArray = data.filter((itemArray) => (
            Number(itemArray[column]) > Number(numberValue)));
        }
        if (comparison === 'igual a') {
          newArray = data.filter((itemArray) => itemArray[column] === numberValue);
        }
      } else {
        newArray = data;
      }
      setInitState({
        ...initstate,
        newData: newArray,
        updateFilter: false,
      });
    }
  }, [data, filterByNumericValues, initstate, setInitState, updateFilter]);

  return (
    <form>
      <input
        type="text"
        onChange={ changeValue }
        data-testid="name-filter"
      />
      <select data-testid="column-filter" name="column" onChange={ sendSelect }>
        { colunFilter.map((colunItem, index) => (
          <option key={ index } value={ colunItem }>{ colunItem }</option>
        )) }
      </select>
      <select data-testid="comparison-filter" name="comparison" onChange={ sendSelect }>
        { comparisonFilter.map((comparisonItem, index) => (
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
        onClick={ () => clickFilter(valueFilter.column) }
      >
        Filtrar
      </button>
      <Order />
    </form>
  );
}

export default Filter;
