import React, { useContext } from 'react';
import PlanetContext from './context/PlanetContex';
import TableOfDate from './TableOfDate';

function Table() {
  const { result, filters } = useContext(PlanetContext);
  const { filterByName } = filters;
  const { name } = filterByName;

  const search = !name ? result
    : result.filter((planet) => planet.name.toLowerCase()
      .includes(name.toLocaleLowerCase()));

  return (
    <div>
      <TableOfDate search={ search } />
    </div>
  );
}

export default Table;
