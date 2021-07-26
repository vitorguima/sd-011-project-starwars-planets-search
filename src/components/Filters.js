import React, { useContext } from 'react';
import Context from '../context/Context';

import NumericFilters from './NumericFilters';

export default function Filters() {
  const {
    setNameFilter,
    filters: { filterByName: { name } },
  } = useContext(Context);

  return (
    <div>
      <input
        data-testid="name-filter"
        value={ name }
        onKeyUp={ ({ target }) => setNameFilter(target.value) }
        onChange={ ({ target }) => setNameFilter(target.value) }
      />
      <NumericFilters />
    </div>
  );
}
