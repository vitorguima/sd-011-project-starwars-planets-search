import React, { useContext } from 'react';
import AppContext from '../../ContextAPI_Configs/AppContext';

function ApplyFilter() {
  const {
    userFilter,
    setUserFilter,
    numericFilter,
    /* setNumericFilter */ } = useContext(AppContext);
  console.log(userFilter, numericFilter, 'alberto santo');

  return (
    <button
      type="button"
      data-testid="button-filter"
      onClick={ () => setUserFilter({
        ...userFilter,
        filters: {
          ...userFilter.filters,
          filterByNumericValues:
            [...userFilter.filters.filterByNumericValues, numericFilter],
        },
      }) }
    >
      Aplicar filtro
    </button>
  );
}

export default ApplyFilter;
