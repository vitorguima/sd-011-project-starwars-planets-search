import React from 'react';
import usePlanets from '../../hooks/usePlanets';

export default function OrderFilter() {
  const { filters, setOrder } = usePlanets();
  const { savedFilters } = filters;

  const getByOrder = () => (
    <div className="col-2">
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="ASCRadio">
          <input
            data-testid="column-sort-input-asc"
            className="form-check-input"
            type="radio"
            name="sort"
            id="ASCRadio"
            value="ASC"
          />
          Ascendente
        </label>
      </div>
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="DESCRadio">
          <input
            data-testid="column-sort-input-desc"
            className="form-check-input"
            type="radio"
            name="sort"
            id="DESCRadio"
            value="DESC"
          />
          Descendente
        </label>
      </div>
    </div>
  );

  const getFilterOptions = () => (
    <>
      Ordenar:
      <div className="col-2">
        <select
          data-testid="column-sort"
          name="column"
          className="form-select "
        >
          {savedFilters.map((filter) => (
            <option key={ filter } value={ filter }>{filter}</option>
          ))}
        </select>
      </div>
    </>
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const column = data.get('column');
    const sort = data.get('sort');
    setOrder({ column, sort });
  };

  return (
    <form
      className="col-6 mt-2 d-flex justify-content-evenly"
      onSubmit={ handleFormSubmit }
    >
      {getFilterOptions()}
      {getByOrder()}
      <button
        data-testid="column-sort-button"
        type="submit"
        className="col-2 btn btn-primary"
      >
        Ordenar

      </button>
    </form>
  );
}
