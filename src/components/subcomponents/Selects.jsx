import React from 'react';
import comparisonFilter from '../../helpers/comparisonFilter';
import columnFilter from '../../helpers/columnFilter';

function Selects() {
  return (
    <fieldset>
      <select data-testid="column-filter">
        {columnFilter.map((option) => (<option key={ option }>{ option }</option>))}
      </select>
      <select data-testid="comparison-filter">
        {comparisonFilter.map((comparison) => (
          <option key={ comparison }>
            {comparison}
          </option>))}
      </select>
      <input type="number" data-testid="value-filter" />
    </fieldset>
  );
}

export default Selects;
