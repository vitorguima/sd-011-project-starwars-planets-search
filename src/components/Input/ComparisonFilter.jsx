import React from 'react';
import usePlanets from '../../hooks/usePlanets';

export default function ComparisonFilter() {
  const magic = 5;
  const { setNumericFilter, filters } = usePlanets();
  const { savedFilters, filterByNumericValues } = filters;
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const column = data.get('column');
    const comparison = data.get('comparison');
    const value = Number(data.get('value'));
    setNumericFilter({ column, comparison, value });
  };

  const getFilterOptions = () => (
    <div className="col-3 m-2">
      <select name="column" data-testid="column-filter" className="form-select">
        {savedFilters.map((filter) => (
          <option key={ filter } value={ filter }>{filter}</option>
        ))}
      </select>
    </div>);

  return (
    <form className="col-6 d-flex justify-content-between" onSubmit={ handleSubmit }>
      {getFilterOptions()}
      <div className="col-2 m-2">
        <select
          name="comparison"
          data-testid="comparison-filter"
          className="form-select"
          defaultValue="maior que"
        >
          <option hidden>Choose</option>
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </div>
      <div className="col-2 m-2">
        <input
          name="value"
          data-testid="value-filter"
          type="text"
          className="form-control"
          id="filterInput"
          placeholder="Search for your Planet"
        />
      </div>
      <div className="col-2 m-2">
        <button
          disabled={ filterByNumericValues.length === magic }
          type="submit"
          className="btn btn-primary"
          data-testid="button-filter"
        >
          Filter
        </button>
      </div>
    </form>
  );
}
