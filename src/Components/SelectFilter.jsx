import React, { useState, useContext, useEffect } from 'react';

import PlanetsContext from '../Context/PlanetsContext';

function SelectFilter() {
  const { filters: { filterByNumericValues },
    setFilterNumeric, data, setFiltered, filtered } = useContext(PlanetsContext);
  const [columns, setColumns] = useState(['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water']);
  const [column, setColumn] = useState('population');
  const [delColumns, setDelColumns] = useState([]);
  const [comparison, setComparison] = useState('maior_que');
  const [numberValue, setNumberValue] = useState('');
  const [btnArray, setBtnArray] = useState([]);

  const setFilter = () => {
    if (filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((obj) => {
        switch (obj.comparison) {
        case 'maior que':
          setFiltered(filtered.filter((pl) => +pl[column] > +numberValue));
          break;
        case 'menor que':
          setFiltered(filtered.filter((pl) => +pl[column] < +numberValue));
          break;
        case 'igual a':
          setFiltered(filtered.filter((pl) => +pl[column] === +numberValue));
          break;
        default:
          break;
        }
      });
    } else {
      setFiltered(data);
    }
  };

  const addFilter = () => {
    setFilterNumeric(
      [...filterByNumericValues, { column, comparison, value: numberValue }],
    );

    // switch (comparison) {
    // case 'maior que':
    //   setFiltered(data.filter((pl) => +pl[column] > +numberValue));
    //   break;
    // case 'menor que':
    //   setFiltered(data.filter((pl) => +pl[column] < +numberValue));
    //   break;
    // case 'igual a':
    //   setFiltered(data.filter((pl) => +pl[column] === +numberValue));
    //   break;
    // default:
    //   break;
    // }
    setDelColumns([...delColumns, ...columns.splice(columns.indexOf(column), 1)]);
    setColumns(columns);
    // setColumn(columns[0]);
    setBtnArray([...btnArray, filterByNumericValues.length]);
  };

  useEffect(setFilter, [filterByNumericValues]);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
    case 'column':
      setColumn(value);
      break;
    case 'comparison':
      setComparison(value);
      break;
    case 'value':
      setNumberValue(value);
      break;
    default:
    }
  };

  const deleteFilter = ({ target: { value } }) => {
    filterByNumericValues.splice(0, 1);
    btnArray.splice(0, 1);
    setFilterNumeric(filterByNumericValues);
    setBtnArray(btnArray);
    setColumns([...columns, delColumns[value]]);
    delColumns.splice(value, 1);
    setFilter();
  };

  return (
    <>
      <br />
      <label htmlFor="column">
        <select
          name="column"
          id="column"
          data-testid="column-filter"
          onChange={ (e) => { handleChange(e); } }
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
      <label htmlFor="comparison">
        <select
          name="comparison"
          id="comparison"
          onChange={ (e) => { handleChange(e); } }
          data-testid="comparison-filter"
        >
          <option
            value="maior que"
          >
            maior que
          </option>
          <option
            value="menor que"
          >
            menor que
          </option>
          <option
            value="igual a"
          >
            igual a
          </option>
        </select>
      </label>
      <br />
      <label htmlFor="value">
        Valor
        <input
          type="text"
          id="value"
          name="value"
          onChange={ (e) => { handleChange(e); } }
          data-testid="value-filter"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ addFilter }
      >
        Filtrar

      </button>
      {btnArray.map((value) => (
        <p data-testid="filter" key={ value }>

          <button
            value={ value }
            type="button"
            onClick={ (e) => { deleteFilter(e); } }
          >
            x
          </button>
        </p>
      ))}

    </>
  );
}

export default SelectFilter;
