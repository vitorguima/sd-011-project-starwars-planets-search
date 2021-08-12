import React, { useState, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function OrderBar() {
  const listColumns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const { setOrder } = useContext(PlanetsContext);

  const [selectColumn, setSelectColumn] = useState('');
  const [selectRadio, setSelectRadio] = useState('');

  const handleColumn = ({ target: { value } }) => {
    setSelectColumn(value);
  };

  const handleRadio = ({ target: { value } }) => {
    setSelectRadio(value);
  };

  const sortFields = () => {
    const order = {
      column: selectColumn,
      radio: selectRadio,
    };
    setOrder(order);
  };

  return (
    <div>
      <select data-testid="column-sort" onChange={ handleColumn }>
        <option>Seleciona a coluna</option>
        {listColumns.map((column, index) => (
          <option key={ index }>{column}</option>
        ))}
      </select>
      <label htmlFor="column-sort-input-asc">
        asc
        <input
          type="radio"
          name="column-sort"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ handleRadio }
        />
      </label>
      desc
      <label htmlFor="column-sort-input-desc">
        <input
          type="radio"
          name="column-sort"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ handleRadio }
        />
      </label>
      <button
        type="button"
        name="button-to-order"
        data-testid="column-sort-button"
        onClick={ sortFields }
      >
        asd
      </button>
    </div>
  );
}
export default OrderBar;
