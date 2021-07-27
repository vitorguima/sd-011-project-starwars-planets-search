import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../../context/PlanetsContext';

export default function Header() {
  const { filters, setFilters } = useContext(PlanetsContext);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  const handleInputChange = ({ value }) => {
    setFilters({
      ...filters, filterByName: { name: value },
    });
  };

  return (
    <input
      type="text"
      name="name"
      value={ filters.filterByName.name }
      data-testid="name-filter"
      onChange={ ({ target }) => handleInputChange(target) }
    />
  );
}
