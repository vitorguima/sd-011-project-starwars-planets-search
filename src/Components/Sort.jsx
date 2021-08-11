import React, { useContext } from 'react';
import Context from '../Context/Context';

export default function Sort() {
  const { toSort,
    setSortColumn,
    setOrderSort,
    orderOptions,
  } = useContext(Context);

  return (
    <>
      <h3>Ordenar:</h3>
      <select
        data-testid="column-sort"
        onChange={ ({ target }) => setSortColumn(target.value) }
      >
        {orderOptions.map((o) => <option key={ o } value={ o }>{o}</option>)}
      </select>
      <label htmlFor="ascendent-label">
        <input
          type="radio"
          name="order"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ ({ target }) => setOrderSort(target.value) }
        />
        ASC
      </label>
      <label htmlFor="descendent-label">
        <input
          type="radio"
          name="order"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ ({ target }) => setOrderSort(target.value) }
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ toSort }
      >
        Ordernar
      </button>
    </>
  );
}
