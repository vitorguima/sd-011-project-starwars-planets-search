import React, { useContext } from 'react';
import TableHeader from './TableHeader';
import Context from '../Context/Context';
import Columns from './Columns';
import NameFilter from './NameFIlter';
import NumberFilter from './NumberFIlter';

const Table = () => {
  const { data, setFilters, filters } = useContext(Context);
  const handleEraseFilter = ({ target }) => {
    const newArr = filters.filterByNumericValues
      .filter((item) => item.column !== target.parentNode.firstChild.innerHTML);
    setFilters({ ...filters, filterByNumericValues: newArr });
    console.log(target.parentNode.firstChild.innerHTML);
  };

  if (data.length === 0) return <p>loading...</p>;
  return (
    <div>
      <NameFilter />
      <NumberFilter />
      { filters.filterByNumericValues.length > 0 && filters.filterByNumericValues
        .map((filter, index) => (
          <div key={ index } data-testid="filter">
            <h4>{filter.column}</h4>
            <h4>{filter.comparison}</h4>
            <h4>{filter.value}</h4>
            <button
              type="button"
              onClick={ ({ target }) => { handleEraseFilter({ target }); } }
            >
              X
            </button>
          </div>
        ))}
      <TableHeader />
      <Columns />
    </div>
  );
};

export default Table;
