import React from 'react';

function Select(params) {
  const { setSort,
    filterTR, sort, isLoaded, setIsLoaded } = params;
  function getSort({ target }) {
    const { name, value } = target;
    setSort({
      order: {
        ...sort.order,
        [name]: value,
      },
    });
  }
  function startSort() {
    if (isLoaded) {
      return setIsLoaded(false);
    }
    return setIsLoaded(true);
  }
  return (
    <div>
      <label htmlFor="column">
        <select
          data-testid="column-sort"
          onChange={ (e) => getSort(e) }
          name="column"
        >
          { filterTR
            .map((filter, index) => (
              <option
                key={ index }
                value={ filter }
              >
                {filter}
              </option>
            ))}
        </select>
      </label>
      <div>
        <label htmlFor="sort">
          asc
          <input
            data-testid="column-sort-input-asc"
            onChange={ (e) => getSort(e) }
            value="ASC"
            name="sort"
            type="radio"
          />
        </label>
        <label htmlFor="sort">
          desc
          <input
            data-testid="column-sort-input-desc"
            onChange={ (e) => getSort(e) }
            value="DESC"
            name="sort"
            type="radio"
          />

        </label>
      </div>
      <button
        type="button"
        onClick={ startSort }
        data-testid="column-sort-button"
      >
        filtrar
      </button>
    </div>
  );
}

export default Select;
