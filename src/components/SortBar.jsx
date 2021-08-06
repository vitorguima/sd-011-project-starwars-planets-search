import React, { useContext, useState } from 'react';
import { StarWarsContext } from '../context/Provider';

function SortBar() {
  const titles = { column: 'name', sort: 'ASC' };
  const { data, filters, setFilters } = useContext(StarWarsContext);
  const [orderOption, setOrderOption] = useState(titles);

  const selectOptions = () => (
    Object.keys(data[0])
      .map((titulo) => (<option key={ titulo } value={ titulo }>{titulo}</option>))
  );

  const testOrder = ({ target: { name, value } }) => (
    setOrderOption({
      ...orderOption,
      [name]: value,
    })
  );

  const columnSel = () => {
    setFilters({
      ...filters,
      order: {
        ...orderOption,
      },
    });
  };

  const numbersToOrdened = {
    max: 1,
    min: -1,
  };

  const ordenedData = () => {
    columnSel();
    const { column, sort } = orderOption;

    if (sort === 'ASC') {
      data.sort((var1, var2) => {
        if (var1[column] > var2[column]) {
          return numbersToOrdened.max;
        }
        return numbersToOrdened.min;
      });
    } else if (sort === 'DESC') {
      data.sort((var1, var2) => {
        if (var1[column] < var2[column]) {
          return numbersToOrdened.max;
        }
        return numbersToOrdened.min;
      });
    }
    data.sort((var1, var2) => (
      var2[column] - var1[column]
    ));
  };

  return (
    <div>
      <div>
        <select
          data-testid="column-sort"
          name="column"
          onChange={ testOrder }
        >
          <option>Select option</option>
          {selectOptions()}
        </select>
        <label htmlFor="ASC">
          ASC
          <input
            type="radio"
            id="ASC"
            name="sort"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ testOrder }
          />
        </label>
        <label htmlFor="DESC">
          DESC
          <input
            type="radio"
            id="DESC"
            name="sort"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ testOrder }
          />
        </label>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ ordenedData }
        >
          Ordenar
        </button>
      </div>
    </div>
  );
}

export default SortBar;
