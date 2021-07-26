import React from 'react';
import MyContext from './MyContext';

function Filters() {
  const { filters, setFilters } = React.useContext(MyContext);
  const [name, setName] = React.useState('');

  const updateFilters = (filterByKey, key, value) => {
    setFilters({
      ...filters,
      [filterByKey]: {
        [key]: value,
      },
    });
  };

  const handleFilters = ({ target: { value } }) => {
    setName(value);
    updateFilters('filterByName', 'name', value.toLowerCase());
  };

  return (
    <input
      value={ name }
      onChange={ handleFilters }
      placeholder="Planet name"
      data-testid="name-filter"
    />
  );
}

export default Filters;
