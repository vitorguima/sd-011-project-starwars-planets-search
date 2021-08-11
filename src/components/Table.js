import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { data } = useContext(StarWarsContext);
  console.log(data);

  return (
    <div>
      {}
    </div>
  );
}
export default Table;
