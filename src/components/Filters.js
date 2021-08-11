import React, { useContext, useEffect } from 'react';
import InputFilterByName from './InputFilterByName';
import InputFilterByNumber from './InputFIlterByNumber';
import InputSort from './InputSort';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { data, setName, setValue,
    setColumn, setComparison, setFiltered } = useContext(StarWarsContext);
  const filterByTextName = (name) => {
    if (name) {
      setFiltered(data.filter((planet) => planet.name.includes(name)));
    } else {
      setFiltered(data);
    }
  };
  useEffect(filterByTextName, [data]);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
    case 'name':
      setName(value);
      filterByTextName(value);
      break;
    case 'column':
      setColumn(value);
      break;
    case 'comparison':
      setComparison(value);
      break;
    case 'value':
      setValue(value);
      break;
    default:
    }
  };

  return (
    <div>
      <InputFilterByName handleChange={ handleChange } />
      <InputFilterByNumber handleChange={ handleChange } />
      <InputSort />
    </div>
  );
}

export default Filters;
