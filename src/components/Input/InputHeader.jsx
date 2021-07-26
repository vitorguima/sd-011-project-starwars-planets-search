import React from 'react';
// import PropTypes from 'prop-types';
import usePlanets from '../../hooks/usePlanets';
import Selector from './Selector';

export default function InputHeader() {
  const { setFilter } = usePlanets();
  return (
    <div>
      <form className="m-2">
        <div className="form-group w-25">
          <input
            data-testid="name-filter"
            type="text"
            className="form-control"
            id="searchInput"
            placeholder="Search for your Planet"
            onChange={ ({ target }) => setFilter(target.value, 'filterByName') }
          />
        </div>
      </form>
      <Selector />
    </div>
  );
}
