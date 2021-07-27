import React from 'react';
import FilterByNumericValues from './FilterByNumericValues';
import FilterByOrder from './FilterByOrder';
import FilterByText from './FilterByText';
import './FilterHeader.css';

function FilterHeader() {
  return (
    <header className="header">
      <h1 className="header-title">PLANETS SEARCH</h1>
      <div className="form-container">
        <FilterByText />
        <FilterByOrder />
        <FilterByNumericValues />
      </div>
    </header>
  );
}

export default FilterHeader;
