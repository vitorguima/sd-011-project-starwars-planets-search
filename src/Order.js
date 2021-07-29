import React, { useContext } from 'react';
import MyContext from './MyContext';

function Order() {
  const colunFilter = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
  const { initstate, setInitState } = useContext(MyContext);
  const { order, newData } = initstate;

  function sortASC() {
    const { column } = order;
    setInitState({
      ...initstate,
      newData: newData.sort((a, b) => Number(a[column]) - Number(b[column])),
    });
  }

  function sortDESC() {
    const { column } = order;
    setInitState({
      ...initstate,
      newData: newData.sort((a, b) => Number(b[column]) - Number(a[column])),
    });
  }

  function orderCell() {
    const { sort } = order;
    if (sort === 'ASC') sortASC();
    if (sort === 'DESC') sortDESC();
  }

  function orderType({ target }) {
    const { value, name } = target;
    setInitState({
      ...initstate,
      order: {
        ...order,
        [name]: value,
      },
    });
  }

  return (
    <>
      <select data-testid="column-sort" onChange={ orderType } name="column">
        { colunFilter.map((colunItem, index) => (
          <option key={ index } value={ colunItem }>{ colunItem }</option>
        )) }
      </select>
      <label htmlFor="ASC">
        ASC
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          name="sort"
          value="ASC"
          onChange={ orderType }
        />
      </label>
      <label htmlFor="DESC">
        DESC
        <input
          id="DESC"
          type="radio"
          data-testid="column-sort-input-desc"
          name="sort"
          value="DESC"
          onChange={ orderType }
        />
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ orderCell }
      >
        Ordenar
      </button>
    </>
  );
}

export default Order;
