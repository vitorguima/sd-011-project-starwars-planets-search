import React, { useContext } from 'react';
import MyContext from './MyContext';

function FilterString() {
  const { setFilters, filters, setNewData, data } = useContext(MyContext);

  const setText = ({ target: { value } }) => {
    setNewData(data.filter(({ name }) => (
      name.toLowerCase().includes(value))));
    setFilters({ ...filters, filterByName: { name: value.toLowerCase() } });
  };

  return (
    <div>
      <label htmlFor="filterByName">
        Nome do Planeta:
        <input
          type="text"
          data-testid="name-filter"
          id="filterByName"
          onChange={ (e) => setText(e) }
        />
      </label>
    </div>
  );
}

export default FilterString;
