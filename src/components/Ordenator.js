import React, { useContext, useState } from 'react';
import AppContext from '../utils/AppContext';
import { removeResidents } from './Table';

function Ordenator() {
  const { planets, filters, setFilters } = useContext(AppContext);
  const [order, setOrder] = useState({
    column: 'name',
    sort: 'ASC',
  });

  const handleSetOrder = ({ target: { name, value } }) => {
    setOrder({
      ...order,
      [name]: value,
    });
  };

  const handleSendOrder = () => {
    setFilters({
      ...filters,
      order,
    });
  };

  return (
    <div>
      <select name="column" onChange={ handleSetOrder } data-testid="column-sort">
        { planets.length > 0 && Object.keys(removeResidents(planets)[0]).map(
          (cell, index) => (
            <option key={ `${cell}${index}` } value={ cell }>
              {cell}
            </option>
          ),
        ) }
      </select>
      <label htmlFor="ASC" data-testid="column-sort-input-asc">
        <input
          type="radio"
          name="sort"
          value="ASC"
          id="ASC"
          onChange={ handleSetOrder }
        />
        ASC
      </label>
      <label htmlFor="DESC" data-testid="column-sort-input-desc">
        <input
          type="radio"
          name="sort"
          value="DESC"
          id="DESC"
          onChange={ handleSetOrder }
        />
        DESC
      </label>
      <button type="button" data-testid="column-sort-button" onClick={ handleSendOrder }>
        Ordenar
      </button>
    </div>
  );
}

export default Ordenator;
