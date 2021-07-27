import React from 'react';
import usePlanets from '../../hooks/usePlanets';

export default function OrderFilter() {
  const { filters } = usePlanets();
  const { savedFilters } = filters;

  const getByOrder = () => (
    <div className="col-2">
      <div className="form-check form-check-inline">
        <label className="form-check-label" htmlFor="ASCRadio">
          <input
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
    <div className="col-2">
      <select name="column" data-testid="column-filter" className="form-select ">
        {savedFilters.map((filter) => (
          <option key={ filter } value={ filter }>{filter}</option>
        ))}
      </select>
    </div>
  );

  return (
    <form className="col-6 mt-2 d-flex justify-content-evenly">
      {getFilterOptions()}
      {getByOrder()}
      <button type="submit" className="col-2 btn btn-primary">Ordenar</button>
    </form>
  );
}
