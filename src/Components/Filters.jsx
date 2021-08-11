import React, { useContext, useEffect } from 'react';

import PlanetsContext from '../Context/PlanetsContext';
import RadioFilter from './RadioFilter';
import SelectFilter from './SelectFilter';
import TextFilter from './TextFilter';

function Filters() {
  const { data, setName, setValue,
    setColumn, setComparison, setFiltered } = useContext(PlanetsContext);
  const filterByTextName = (name) => {
    if (name) {
      setFiltered(data.filter((pl) => pl.name.includes(name)));
      // setFiltered(textFiltered);
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
    <form>
      <TextFilter handleChange={ handleChange } />
      <SelectFilter handleChange={ handleChange } />
      <RadioFilter />
    </form>
  );
}

export default Filters;
