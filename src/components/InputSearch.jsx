import React, { useContext, useState } from 'react';
import Context from '../context/Context';

const InputSearch = () => {
  const [handleSearch, setHandleSearch] = useState('');
  const { filterName, setFilterName } = useContext(Context);
  const handleFilterSearching = ({ target }) => {
    setHandleSearch(target.value);
    setFilterName({ ...filterName,
      filters:
      { filterByName: { name: target.value },
        filterByNumericValues: {
          column: '',
          comparison: '',
          value: '1',
        },
      } });
  };

  return (
    <input
      type="text"
      data-testid="name-filter"
      onChange={ handleFilterSearching }
      value={ handleSearch }
      placeholder="Search your planet..."
    />
  );
};

export default InputSearch;
