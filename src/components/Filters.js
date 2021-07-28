import React from 'react';

import NameFilter from './NameFilter';
import NumericFilters from './NumericFilters';
import OrderFilter from './OrderFilter';

export default function Filters() {
  return (
    <div>
      <div>
        <NameFilter />
      </div>
      <div>
        <NumericFilters />
      </div>
      <div>
        <OrderFilter />
      </div>
    </div>
  );
}
