import React from 'react';
import Context from '../../utils/Context';

function Filters() {
  const { filters, setFilters } = React.useContext(Context);
  const [name, setName] = React.useState('');

  const updateFilters = (filterByKey, key, value) => {
    setFilters({
      ...filters,
      [filterByKey]: {
        [key]: value,
      },
    });
  };

  const handleNameFilterChange = ({ target: { value } }) => {
    setName(value);
    updateFilters('filterByName', 'name', value.toLowerCase());
  };

  return (
    <input
      value={ name }
      onChange={ handleNameFilterChange }
      placeholder="Planet name"
      data-testid="name-filter"
    />
  );
}

export default Filters;
