import React from 'react';
import usePlanets from '../../hooks/usePlanets';

export default function Selector() {
  const { setNumericFilter } = usePlanets();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const column = data.get('column');
    const comparison = data.get('comparison');
    const value = Number(data.get('value'));
    setNumericFilter({ column, comparison, value });
  };

  return (
    <form className="row" onSubmit={ handleSubmit }>
      <div className="col-3 m-2">
        <select name="column" data-testid="column-filter" className="form-select">
          <option hidden selected>Select your filter</option>
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </div>
      <div className="col-2 m-2">
        <select name="comparison" data-testid="comparison-filter" className="form-select">
          <option hidden selected>{'>'}</option>
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
        <button type="submit" className="btn btn-primary" data-testid="button-filter">
          Filter
        </button>
      </div>
    </form>
  );
}
